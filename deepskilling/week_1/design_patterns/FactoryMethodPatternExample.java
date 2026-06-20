interface Document {
    void open();
}

class WordDocument implements Document {
    public void open() {
        System.out.println("Manuscript");
    }
}

class PdfDocument implements Document {
    public void open() {
        System.out.println("Blueprint");
    }
}

class ExcelDocument implements Document {
    public void open() {
        System.out.println("Spreadsheet");
    }
}

abstract class DocumentFactory {
    public abstract Document createDocument();
}

class WordDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new WordDocument();
    }
}

class PdfDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new PdfDocument();
    }
}

class ExcelDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new ExcelDocument();
    }
}

public class FactoryMethodPatternExample {
    public static void main(String[] args) {
        DocumentFactory factory = new WordDocumentFactory();
        Document doc = factory.createDocument();
        doc.open();
    }
}
