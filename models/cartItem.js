class CartItem {
  constructor(
    id,
    inventoryId,
    sentQuantity,
    availableQuantity,
    productName,
    productPrice,
    sum,
    image,
    size,
    serialNumber,
  ) {
    this.id = id;
    this.inventoryId=inventoryId;
    this.sentQuantity = sentQuantity;
    this.availableQuantity = availableQuantity;
    this.productName = productName;
    this.productPrice = productPrice;
    this.sum = sum;
    this.image = image;
    this.size = size;
    this.serialNumber = serialNumber;
  }
}

export default CartItem;
