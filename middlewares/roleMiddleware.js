const Permit=(...allowedRoles)=>{
    return (req,res,next)=>{
        console.log('r',req.user.role);
        
        if(!req.user.role){
            
            
            return res.status(401).json({message:'user role is missing'})
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:'unauthorized access'})
        }
        next()
    }
}
  

export default Permit