const connected = (req, res, next)=>{
    console.log(req.url, req.method);
    return res.json({ok : true })
    // next();
}

export {
    connected
}