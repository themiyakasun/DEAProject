package myPackage.admin;

public class products {
    int proId;
    int catId;
    String proName;
    double proPrice;
    String proImg;
    String proDesc;
    double proReviews;
    String date;

    public Product(int proId, int catId, String proName, double proPrice, String proImg, String proDesc, double proReviews, String date){
        this.proId = proId;
        this.catId = catId;
        this.proName = proName;
        this.proPrice = proPrice;
        this.proImg = proImg;
        this.proDesc = proDesc;
        this.proReviews = proReviews;
        this.date = date;
    }
}
