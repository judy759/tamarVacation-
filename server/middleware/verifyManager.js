const verifyManager=(req,res,next)=>{
if(req.user&&req.user.roles==='Manager'){
    next()
}
else{
    return res.status(401).json({
        error:true,
        message:"NOT GOOD AUTOHEADER manager",
        data:null})
}


}
module.exports=verifyManager