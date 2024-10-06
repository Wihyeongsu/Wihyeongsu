import matplotlib.pyplot as plt

def read_data(filename):
    data = []
    with open(filename, 'r') as f:
        for line in f.readlines():
            if not line.startswith('#'): # If 'line' is not a header
                data.append([int(word) for word in line.split(',')])
    return data

if __name__ == '__main__':
    # Load score data
    class_kr = read_data('data/class_score_kr.csv')
    class_en = read_data('data/class_score_en.csv')

    # TODO) Prepare midterm, final, and total scores
    # kr scores
    midterm_kr, final_kr = zip(*class_kr)
    total_kr = [40/125*midterm + 60/100*final for (midterm, final) in class_kr]

    # en scores
    midterm_en, final_en = zip(*class_en)
    total_en = [40/125*midterm + 60/100*final for (midterm, final) in class_en]

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize = (6, 10))
    fig.suptitle('Midterm and Final Exam Visualization', fontsize = 16)

    # TODO) Plot midterm/final scores as points
    ax1.scatter(x = midterm_kr, y = final_kr, c = ['#ff0000'])
    ax1.scatter(x = midterm_en, y = final_en, c = ['#0000ff'], marker = '+')
    ax1.set_title('Scatter plot')
    ax1.set_xlabel('Midterm scores')
    ax1.set_ylabel('Final scores')
    ax1.axis((0, 125, 0, 100))
    ax1.grid(True)
    ax1.legend()

    # TODO) Plot total scores as a histogram
    ax2.hist(x = total_kr ,bins = 20, range = (0, 100), color = '#ff0000', stacked = True, histtype = 'barstacked', label = 'Korean', alpha = 1.0)
    ax2.hist(x = total_en ,bins = 20, range = (0, 100), color = '#0000ff', stacked = True, histtype = 'barstacked', label = 'English', alpha = 0.3)
    ax2.set_title('Histogram')
    ax2.set_xlabel('Total scores')
    ax2.set_ylabel('The number of students')
    ax2.set_xlim(0, 100)
    ax2.legend()

    plt.show()