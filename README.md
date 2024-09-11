# Rust Burn

> [!NOTE] sdf
> sdf

```toml title:'Cargo.toml'
[package]
name = "guide"
version = "0.1.0"
edition = "2021"

[dependencies]
burn = { version = "0.14.0", features = ["train", "wgpu", "vision"] }
```

- MNIST dataset을 이용한 CNN model 예시
- 용어
	- `convolution layer`:
		- 입력 데이터에 filter를 적용하여 특징을 추출
		- parameter: filter size, stride, padding
	- `filter/kernel`:
		- 입력 데이터의 특정 패턴을 감지하는 행렬
		- 학습 파라미터
	- `stride`:
		- filter가 데이터를 이동하는 간격, 보폭
		- 출력 크기를 감소
	- `channel`:
		- 이미지의 깊이(RGB 이미지는 3개의 채널을 가짐)
	- `padding`:
		- 입력 데이터의 가장자리에 추가되는 데이터
		- 출력 크기를 조절하고 가장자리 데이터를 보존하기 위해 사용
	- `feature map`:
		- 합성곱 연산의 결과
		- 입력 데이터의 특정 특징을 나타냄
	- `pooling layer`:
		- feature map의 크기를 줄이고 중요한 특징을 유지
		- `max pooling`, `average pooling`
	- `activation function`:
		- 비선형성을 추가하여 네트워크의 표현력을 높임
		- `ReLU`, `Sigmoid`, `Tanh`
	- `dropout`:
		- overfitting을 방지하기 위한 정규화 기법
		- 학습 중 무작위로 일부 뉴런을 비활성화
# Model
```rust title:'src/model.rs'
use burn::{
    nn::{
        conv::{Conv2d, Conv2dConfig},
        pool::{AdaptiveAvgPool2d, AdaptiveAvgPool2dConfig},
        Dropout, DropoutConfig, Linear, LinearConfig, Relu,
    },
    prelude::*,
};

#[derive(Config, Debug)]
pub struct ModelConfig {
    num_classes: usize,
    hidden_size: usize,
    #[config(default = "0.5")]
    dropout: f64,
}

impl ModelConfig {
    /// Returns the initialized model.
    pub fn init<B: Backend>(&self, device: &B::Device) -> Model<B> {
        Model {
            conv1: Conv2dConfig::new([1, 8], [3, 3]).init(device),
            conv2: Conv2dConfig::new([8, 16], [3, 3]).init(device),
            pool: AdaptiveAvgPool2dConfig::new([8, 8]).init(),
            activation: Relu::new(),
            linear1: LinearConfig::new(16 * 8 * 8, self.hidden_size).init(device),
            linear2: LinearConfig::new(self.hidden_size, self.num_classes).init(device),
            dropout: DropoutConfig::new(self.dropout).init(),
        }
    }
}

#[derive(Module, Debug)]
pub struct Model<B: Backend> {
    conv1: Conv2d<B>,
    conv2: Conv2d<B>,
    pool: AdaptiveAvgPool2d,
    dropout: Dropout,
    linear1: Linear<B>,
    linear2: Linear<B>,
    activation: Relu,
}

impl<B: Backend> Model<B> {
    /// # Shapes
    ///   - Images [batch_size, height, width]
    ///   - Output [batch_size, num_classes]
    pub fn forward(&self, images: Tensor<B, 3>) -> Tensor<B, 2> {
        let [batch_size, height, width] = images.dims();

        // Create a channel at the second dimension.
        let x = images.reshape([batch_size, 1, height, width]);

        let x = self.conv1.forward(x); // [batch_size, 8, _, _]
        let x = self.dropout.forward(x);
        
        let x = self.conv2.forward(x); // [batch_size, 16, _, _]
        let x = self.dropout.forward(x);
        let x = self.activation.forward(x);

        let x = self.pool.forward(x); // [batch_size, 16, 8, 8]
        
        let x = x.reshape([batch_size, 16 * 8 * 8]);
        
        let x = self.linear1.forward(x);
        let x = self.dropout.forward(x);
        let x = self.activation.forward(x);

        self.linear2.forward(x) // [batch_size, num_classes]
    }
}
```

- `forward` 과정
	1. 입력처리:
		- 입력 데이터에 channel 차원을 추가하여 4D 텐서를 생성(흑백 이미지이므로 channel이 1)
	2. 첫 번째 convolution layer:
		- 8개의 feature map을 생성
		- dropout을 적용하여 overfitting 방지
	3. 두 번째 convolution layer:
		- 16개의 feature map 생성
		- dropout 적용
		- activation function(ReLU)을 통해 비선형성 추가
	4. pooling layer:
		- adaptive average pooling을 통해 feature map의 크기를 8x8로 축소
	5. flattening:
		- 4D 텐서를 2D 텐서로 변환
	6. 첫 번째 fully connected layer:
		- fully connected layer를 통과
		- dropout 적용
		- activation function(ReLU) 적용
	7. output layer:
		- 마지막 fully connected layer를 통과하여 출력 생성
# Data

```rust title:'batcher trait'
pub trait Batcher<Item, Batch> {
    fn batch(&self, items: Vec<Item>) -> Batch;
}
```
- `Item`: 개별 데이터 아이템의 타입
- `Batch`: 배치 형태의 데이터 타입
- `batch`: 아이템을 벡터로 받아 배치로 변환

- batcher 트레이트의 주요 특징과 사용 목적:
	1. 데이터 전처리:
	    - 원시 데이터를 모델에 입력 가능한 형태로 변환합니다.
	    - 예: 이미지 정규화, 텍스트 토큰화 등
	2. 배치 생성:
	    - 여러 개의 개별 샘플을 하나의 배치로 결합합니다.
	    - 이는 모델의 효율적인 학습과 추론을 가능하게 합니다.
	3. 메모리 효율성:
	    - 대량의 데이터를 한 번에 처리하는 대신, 작은 배치 단위로 처리할 수 있게 합니다.
	4. 데이터 타입 변환:
	    - 원시 데이터 형식(예: 바이트 배열)을 텐서와 같은 모델 입력 형식으로 변환합니다.
	5. 디바이스 관리:
	    - 데이터를 적절한 연산 디바이스(CPU/GPU)로 이동시킵니다.
	6. 커스텀 로직 적용:
	    - 데이터셋 특성에 맞는 특별한 전처리나 증강(augmentation) 로직을 구현할 수 있습니다.

```rust title:'src/data.rs'
use burn::{
    data::{dataloader::batcher::Batcher, dataset::vision::MnistItem},
    prelude::*,
};

#[derive(Clone)]
pub struct MnistBatcher<B: Backend> {
    device: B::Device,
}

impl<B: Backend> MnistBatcher<B> {
    pub fn new(device: B::Device) -> Self {
        Self { device }
    }
}

#[derive(Clone, Debug)]
pub struct MnistBatch<B: Backend> {
    pub images: Tensor<B, 3>,
    pub targets: Tensor<B, 1, Int>,
}

impl<B: Backend> Batcher<MnistItem, MnistBatch<B>> for MnistBatcher<B> {
    fn batch(&self, items: Vec<MnistItem>) -> MnistBatch<B> {
	    // 이미지 처리
        let images = items
            .iter()
            .map(|item| TensorData::from(item.image).convert::<B::FloatElem>())
            .map(|data| Tensor::<B, 2>::from_data(data, &self.device))
            .map(|tensor| tensor.reshape([1, 28, 28]))
            // Normalize: make between [0,1] and make the mean=0 and std=1
            // values mean=0.1307,std=0.3081 are from the PyTorch MNIST example
            // https://github.com/pytorch/examples/blob/54f4572509891883a947411fd7239237dd2a39c3/mnist/main.py#L122
            .map(|tensor| ((tensor / 255) - 0.1307) / 0.3081)
            .collect();

		// 레이블 처리
        let targets = items
            .iter()
            .map(|item| {
                Tensor::<B, 1, Int>::from_data(
                    [(item.label as i64).elem::<B::IntElem>()],
                    &self.device,
                )
            })
            .collect();

		// 이미지, 레이블 배치 결합
        let images = Tensor::cat(images, 0).to_device(&self.device);
        let targets = Tensor::cat(targets, 0).to_device(&self.device);

        MnistBatch { images, targets }
    }
}
```

- 이미지 처리
	1. `.map(|item| TensorData::from(item.image).convert::<B::FloatElem>())`: image 데이터를 백엔드의 부동소수점 타입 TensorData로 변환
	2. `.map(|data| Tensor::<B, 2>::from_data(data, &self.device))`: 2차원 텐서를 생성하여 device에 할당
	3. `.map(|tensor| tensor.reshape([1, 28, 28]))`: 2D 텐서를 1x28x28 크기의 3D 텐서로 변환
	4. `.map(|tensor| ((tensor / 255) - 0.1307) / 0.3081)`: 이미지 정규화

- 레이블 처리
	1. `item.label as i64`: 레이블을 i64로 변환
	2. `.elem::<B::IntElem>()`: 백엔드의 정수 타입으로 변환
	3. `Tensor::<B, 1, Int>::from_data(...)`: 1차원 정수 텐서를 생성하여 device에 할당

- 이미지, 레이블 배치 결합
	- `Tensor::cat(images, 0)`: 각각의 이미지 텐서들을 연결(\[1, 28, 28] 이미지 텐서 N개를 연결 -> \[N, 28, 28\] 텐서)
	- `Tensor::cat(targets, 0)`: 각각의 레이블 텐서들을 연결(\[N] 텐서)
	- `.to_device(&self.device)`: 연결된 텐서를 device로 이동

# Training
- output types
	- `ClassificationOutput`
	- `RegressionOutput`

```rust title:'src/model.rs'
impl<B: Backend> Model<B> {
    pub fn forward_classification(
        &self,
        images: Tensor<B, 3>,
        targets: Tensor<B, 1, Int>,
    ) -> ClassificationOutput<B> {
        let output = self.forward(images);
        let loss = CrossEntropyLossConfig::new()
            .init(&output.device())
            .forward(output.clone(), targets.clone());

        ClassificationOutput::new(loss, output, targets)
    }
}

impl<B: AutodiffBackend> TrainStep<MnistBatch<B>, ClassificationOutput<B>> for Model<B> {
    fn step(&self, batch: MnistBatch<B>) -> TrainOutput<ClassificationOutput<B>> {
        let item = self.forward_classification(batch.images, batch.targets);

        TrainOutput::new(self, item.loss.backward(), item)
    }
}

impl<B: Backend> ValidStep<MnistBatch<B>, ClassificationOutput<B>> for Model<B> {
    fn step(&self, batch: MnistBatch<B>) -> ClassificationOutput<B> {
        self.forward_classification(batch.images, batch.targets)
    }
}
```

- `forward_classification`:
	- `output`: 모델의 순전파 결과를 저장
	- `loss`: output과 target를 파라미터로 받아 cross-entrophy를 통해 loss를 계산
- 
