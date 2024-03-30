const CouponModel = require("../model/couponSchema")
// create coupon
const createCoupon = async (req, res)=>{
const coupon = await CouponModel.findOne({couponCode:req.body.couponCode});
if(coupon){
    return res.json({
        success: false,
        message: "Already have coupon with same name"
    })
}
try {
    const newCoupon = new CouponModel({
        ...req.body
    });
    await newCoupon.save();
    res.json({
        success: true,
        message:"Coupon created successfully"
    })
} catch (error) {
    res.json({
        success: false,
        message: "Something went wrong"
    })
}

}

// get coupons
const getCoupon = async (req, res)=>{
    try {
        const coupon = await CouponModel.find({});

    if(!coupon){
        return res.json({
            success: false,
            message: "Coupon not found"
        })
    }
    res.json({
        success: true,
        message:"Your coupon found",
        results:coupon
    });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
    
}

// update coupon
const updateCoupon = async (req, res)=>{
try {
    const coupon = await CouponModel.findOne({couponCode:req.params.couponCode});
    if(!coupon){
        return res.json({
            success: false,
            message: "Coupon not found"
        })
    }
    if(req.body.couponCode || req.body.discountPercentage || req.body.maxDiscountInRs || startDate || req.body.endDate || (req.body.isActive == (true || false))){
await CouponModel.updateMany({
    couponCode: req.params.couponCode
},{$set:{...req.body}});
    }
    
} catch (error) {
    res.json({
        success: false,
        message:"Something went wrong",
    })
}    
}

// delete coupon

const deleteCoupon = async (req, res)=>{
try {
    const coupon = await CouponModel.findOne({couponCode: req.params.couponCode});
    if(!coupon){
        return res.json({
            success: false,
            message: "Coupon not found"
        });
    }
    await CouponModel.findOneAndDelete({couponCode:req.params.couponCode});
    res.json({
        success: true,
        message: "Coupon deleted successfully"
    });
} catch (error) {
    res.json({
        success: false,
        message:"Something went wrong"
    })
}
}
module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}

// sellerId = 660285c74183629861251ba3