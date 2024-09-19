def read_data(filename):
    # TODO) Read `filename` as a list of integer numbers
    # TODO) 파일 종류에 따른 데이터 전처리
    data = []
    try:
        with open(filename, 'r') as fi:
            for line in fi.readlines():
                try:
                    data.append([int(word) for word in line.strip().split(',')])
                    
                except ValueError as ex:
                    print(f'A line is ignored. (message: {ex})')
    except Exception as ex:
        print(f'Cannot run the program. (message: {ex})')

    return data

def calc_weighted_average(data_2d, weight):
    # TODO) Calculate the weighted averages of each row of `data_2d`
    average = []
    for m,f in data_2d:
        average.append(m*weight[0] + f*weight[1])

    return average

def expectation(data_1d):

    return sum(data_1d)/len(data_1d)
    
def analyze_data(data_1d):
    # TODO) Derive summary of the given `data_1d`
    # Note) Please don't use NumPy and other libraries. Do it yourself.
    mean = expectation(data_1d)
    var = expectation([datum**2 for datum in data_1d]) - expectation(data_1d)**2
    mid = int((len(data_1d)-1)/2)
    median = data_1d[mid] if len(data_1d) % 2 == 1 else sum(data_1d[mid:mid+1])/2

    return mean, var, median, min(data_1d), max(data_1d)

if __name__ == '__main__':
    data = read_data('data/class_score_en.csv')
    if data and len(data[0]) == 2: # Check 'data' is valid
        average = calc_weighted_average(data, [40/125, 60/100])

        # Write the analysis report as a markdown file
        with open('class_score_analysis.md', 'w') as report:
            report.write('### Individual Score\n\n')
            report.write('| Midterm | Final | Average |\n')
            report.write('| ------- | ----- | ----- |\n')
            for ((m_score, f_score), a_score) in zip(data, average):
                report.write(f'| {m_score} | {f_score} | {a_score:.3f} |\n')
            report.write('\n\n\n')

            report.write('### Examination Analysis\n')
            data_columns = {
                'Midterm': [m_score for m_score, _ in data],
                'Final'  : [f_score for _, f_score in data],
                'Average': average }
            for name, column in data_columns.items():
                mean, var, median, min_, max_ = analyze_data(column)
                report.write(f'* {name}\n')
                report.write(f'  * Mean: **{mean:.3f}**\n')
                report.write(f'  * Variance: {var:.3f}\n')
                report.write(f'  * Median: **{median:.3f}**\n')
                report.write(f'  * Min/Max: ({min_:.3f}, {max_:.3f})\n')