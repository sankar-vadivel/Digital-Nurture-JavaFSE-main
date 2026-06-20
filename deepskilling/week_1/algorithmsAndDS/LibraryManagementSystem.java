import java.util.Arrays;
import java.util.Comparator;

class Book {
    private String bookId;
    private String title;
    private String author;

    public Book(String bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

    public String getTitle() {
        return title;
    }
}

public class LibraryManagementSystem {
    public static Book linearSearchByTitle(Book[] books, String title) {
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }

    public static Book binarySearchByTitle(Book[] books, String title) {
        int left = 0;
        int right = books.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int comparison = books[mid].getTitle().compareToIgnoreCase(title);

            if (comparison == 0) {
                return books[mid];
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Book[] books = {
                new Book("B1", "Chronicles of the Nebula", "Zephyr Vance"),
                new Book("B2", "Echoes of Eternity", "Seraphina Dawn"),
                new Book("B3", "The Quantum Enigma", "Orion Pax")
        };

        Book found1 = linearSearchByTitle(books, "Echoes of Eternity");

        Arrays.sort(books, Comparator.comparing(Book::getTitle));

        Book found2 = binarySearchByTitle(books, "Echoes of Eternity");
    }
}
