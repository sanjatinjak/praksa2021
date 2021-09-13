export default class Product {
    constructor(id, serialNumber, name, description, price, brandCategory, genderCategory, subCategory, image) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brandCategory = brandCategory;
        this.genderCategory = genderCategory;
        this.subCategory = subCategory;
        this.image = [image];
    }
}