const model = require ('../models/tradeModel');

exports.index = (req,res)=>{                 
     let stories = model.findCat();
     res.render('./trade/trades',{stories});
 };
 
exports.new = (req,res)=>{
    res.render('./trade/newTrade');
};

exports.create = (req,res)=>{

    let item = req.body;
    model.save(item);
    res.redirect('/trades');
};

exports.show = (req,res,next)=>{       
    let id = req.params.id;        
    let story = model.findItemById(id);
    if (story){
        res.render('./trade/trade',{story});
    }else{
        let err = new Error('No Item with id '+id+' found. Please re-check the entered id !');
        err.status=404;
        next(err);
    }
};


exports.edit = (req,res,next)=>{                 
    let id = req.params.id        
    let story = model.findItemById(id);
    let category = model.findCatByItemId(story.catid);
    if (story){
        res.render('./trade/edit',{story, category});
    }else{
    let err = new Error('No Item with id '+id+' found to edit.');
    err.status=404;
    next(err);
    }
};

exports.update = (req,res,next)=> {
    let story = req.body;
    let id = req.params.id;
   if (model.updateById(id,story)){
    res.redirect('/trades/'+id);
    }else{
        let err = new Error('No Item with id '+id+' found to update. Please re-check the id !');
        err.status=404;
        next(err);
    }
};

exports.delete = (req,res,next)=> {
    let id = req.params.id;
    if (model.deleteById(id))
        res.redirect('/trades');
    else{
        let err = new Error('No Item with id '+id+' found to delete');
        err.status=404;
        next(err);
    }

    
};

exports.deleteCatForm = (req,res,next)=> {               
    let category = model.findAllCat();    
    if (category.length>0){
        res.render('./trade/deleteCat',{category});
    }else{
    let err = new Error('No category to delete.');
    err.status=404;
    next(err);    
    }
};

exports.deleteCat = (req,res,next)=> {
    let cat = req.body.Category;    
    if (model.deleteCatByName(cat))
        res.redirect('/trades');
    else{
        let err = new Error('No category found to delete');
        err.status=404;
        next(err);
    }  
};

