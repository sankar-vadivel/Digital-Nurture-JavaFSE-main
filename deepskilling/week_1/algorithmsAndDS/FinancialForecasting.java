public class FinancialForecasting {

    public static double predictFutureValue(double pastValue, double growthRate, int periods) {
        if (periods == 0) {
            return pastValue;
        }
        return predictFutureValue(pastValue * (1 + growthRate), growthRate, periods - 1);
    }

    public static void main(String[] args) {
        double initialValue = 1000.0;
        double growthRate = 0.05;
        int years = 10;

        double futureValue = predictFutureValue(initialValue, growthRate, years);
        System.out.println(futureValue);
    }
}
