import java.util.Arrays;
import java.util.Comparator;

class SearchProduct {
    private String productId;
    private String productName;
    private String category;

    public SearchProduct(String productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    public String getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public String getCategory() {
        return category;
    }
}

public class EcommerceSearchFunction {
    public static SearchProduct linearSearch(SearchProduct[] products, String targetProductId) {
        for (SearchProduct product : products) {
            if (product.getProductId().equals(targetProductId)) {
                return product;
            }
        }
        return null;
    }

    public static SearchProduct binarySearch(SearchProduct[] products, String targetProductId) {
        int left = 0;
        int right = products.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int comparison = products[mid].getProductId().compareTo(targetProductId);

            if (comparison == 0) {
                return products[mid];
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        SearchProduct[] products = {
                new SearchProduct("P3", "Wireless Mechanical Keyboard", "Electronics"),
                new SearchProduct("P1", "Hydrating Lip Tint", "Cosmetics"),
                new SearchProduct("P2", "Precision Rollerball Pen", "Stationery")
        };

        SearchProduct result1 = linearSearch(products, "P2");

        Arrays.sort(products, Comparator.comparing(SearchProduct::getProductId));

        SearchProduct result2 = binarySearch(products, "P2");
    }
}
