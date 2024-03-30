#  Backend for Arya Store Online (Personal Project)
#### BaseUrl - https://arya-store-online-backend.onrender.com/
## How to use apis

### For Users - {{BaseUrl}}/api/user
##### User Register - {{BaseUrl}}/api/user/create
METHOD - "POST" <br>
req.body - {email:"xyz@abc.com, password:"******"name:"xyz", address:"India", role:"buyer or seller"} <br>
##### User Login - {{BaseUrl}}/api/user 
METHOD - "GET" <br>
req.body = {email: 'xyz@abc.com', password:"*******"} <br>
##### User Update - {{BaseUrl}}/api/user/:userId
METHOD - "PUT" <br>
Note: Use token while login <br>
##### User delete - {{BaseUrl}}/api/user/:userId
METHOD - "DELETE" <br>
Note: Use token while login <br>
##### User Password Update - {{BaseUrl}}/api/user/addNewPass
METHOD - "PATCH" <br>
First Verify user with otp on {{BaseUrl}}/api/otpVerification <br>
Note: Use token while login <br> <br>
### For Users Wishlist
##### Add to wishlist for particular User - {{BaseUrl}}/api/user/wishlist
METHOD - "POST" <br>
req.body - {productId - "productId"} <br>
Note: Use token while login <br>
##### Remove from wishlist for particular User - {{BaseUrl}}/api/user/wishlist/:productId
METHOD - "DELETE" <br>
req.params = {prductID:"productId"} <br> <br>
Note: Use token while login <br>
### For product - {{BaseUrl}}/api/products
##### Create Product - {{BaseUrl}}/api/products/create
METHOD - "POST" <br>
req.body - {title:"abc", "image":"url","price:123,"description:"xyz", discount:123(percentage value only), color:"xyz", stock:123,category:"abc"} <br>
Note: Use sellers token only <br>
##### Get All products - {{BaseUrl}}/api/products/all
METHOD - "GET" <br>
No authentication require
##### Update product - {{BaseUrl}}/api/products/item/:productId
METHOD - "PATCH"
req.body - {title, image, price, description, discount, color, stock, brand, category} - only these field can be updated <br>
Note: Use sellers token only <br>
##### Delete product - {{BaseUrl}}/api/products/delete/item/:productId 
METHOD - "DELETE" <br>
req.params - {productId: productId} <br>
Note: Use sellers token only <br>
##### Get Products accoding to category - {{BaseUrl}}/api/products/categories
METHOD - "GET" <br>
No authentication require <br>
##### Get Products of particular category - {{BaseUrl}}/api/products/category/:categoryName
METHOD - "GET" <br>
req.params - {categoryName:"abc"} <br>
No authentication require <br>
##### Get Products accoding to brand - {{BaseUrl}}/api/products/brands
METHOD - "GET" <br>
No authentication require <br>
##### Get Products of particular brand - {{BaseUrl}}/api/products/brand/:brandName
METHOD - "GET" <br>
req.params - {brandName:"abc"} <br>
No authentication require <br> <br>
### For coupon - {{BaseUrl}}/api/coupon 
##### Create coupon - {{BaseUrl}}/api/coupon/create
METHOD - "POST" <br>
req.body - {couponCode:"xyz"(should be unique), discountPercentage:12 (Percent value only),maxDiscountInRs:123,startDate:"Date"(yyyy-mm-dd),endDate:"Date"(yyyy-mm-dd), isActive:true or false} <br>
Note: Use only admin token  <br>
##### Get coupon - {{BaseUrl}}/api/coupon
METHOD - "GET" <br>
No authentication require <br>
##### Update coupon - {{BaseUrl}}/api/coupon/:couponCode
METHOD - "PATCH" <br>
req.params - {couponCode:"xyz"}
req.body - {discountPercentage:12 (Percent value only),maxDiscountInRs:123,startDate:"Date"(yyyy-mm-dd),endDate:"Date"(yyyy-mm-dd), isActive:true or false} <be>
Note: Use only admin token <br>
##### Delete coupon - {{BaseUrl}}/api/coupon/delete/:couponCode
METHOD - "DELETE" <br>
req.params - {couponCode:"abc"} <br>
Note: Use only admin token <br>
### For cart - {{BaseUrl}}/api/cart
##### Create Cart - {{BaseUrl}}/api/cart/create
METHOD - "POST" <br>
req.body - {products:[array of products(should contains only productId, quantity, color, price)]} <br>
Note: Use customer token only <br>
##### Get Cart - {{BaseUrl}}/api/cart
METHOD - "GET <br>
Note: Use customer token only <br> <br>
### For Order and Payment creation - {{BaseUrl}}/api/order
##### Create Order and payment - {{BaseUrl}}/api/order/:orderId
METHOD - "POST" <br>
req.body - {couponCode (if have), deliveryDate:"Date"(yyyy-mm-dd), modeOfPayment:"XYZ"(use capital letters only) } <br>
Note: Use customer token only <br>
##### Get Order and payment - {{BaseUrl}}/api/order/:orderId
METHOD: "GET" <br>
req.params - {orderId} <br>
Note: Use customer token only <br> <br>

### Please match the words before using the API as it is mendatory to use same words for requests <br>
### If bug found, Please report on EMAIL: - aadarshraj.dev.js@gmail.com or LINkedIN - https://www.linkedin.com/in/aadarsh-raj-80b862216/ or have some queries feel free to contact
<br>

# Created By [AADARSH RAJ(ARYA)]https://aadarshrajportfolio.netlify.app/
