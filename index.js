const express =require('express');
const bodyparser =require('body-parser');
const cors =require('cors');
const mysql =require('mysql2');

const app=express();
app.use(cors());
app.use(bodyparser.json());
// app.use(mysql())
// database connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'statedistrict',
    port:'3306'
});
//check db connection 
db.connect(err=>{
    if (err){
        console.log(err,'err')
    }
    console.log('database connected...')
})
// get all data

app.get('/state',(req,res)=>{
    let qr=`select * from state`;
    db.query(qr,(err,result)=>{
if(err){
    console.log(err,'errs')
}
if(result.length>0){
    res.send({
       message:'all user data',
       data:result
    })
}else{
    res.send({
        message:' data not found'
     })
}

    })
});

//get data by id
app.get('/district/:state_id',(req,res)=>{

   let getStateId=req.params.state_id;
   let qr=`select * from district where state_id= ${getStateId}`;
   db.query(qr,(err,result)=>{
    if(err){
        console.log(err,'errs')
    }
    if(result.length>0){
        res.send({
           message:'all user data',
           data:result
        })
    }else{
        res.send({
            message:' data not found'
         })
    }
   })
});
//post state data

app.post('/saveState',(req,res)=>{
    console.log('post data')
    let name=req.body.name;
    let data1=null;
    let selectQr=`select * from state where name=+"${name}"`
    db.query(selectQr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        if(result.length>0){
            res.send({
               message:'data already present',
               data:result
            })
        }
        else{
            let qr=`insert into state(name) values('${name}')`;
            db.query(qr,(err,result)=>{
                if(err){
                    console.log(err);
                }
            
                    res.send({
                        message:'data inserted'
                    });
             
            })  
        }
    })
    //
    
   
    
})
//post district data
app.post('/saveDistrict',(req,res)=>{
    console.log('post data')
    let name=req.body.name;
    let state_id=req.body.state_id;
    let data1=null;
    let selectQr=`select * from district where name=+"${name}"`
    db.query(selectQr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        if(result.length>0){
            res.send({
               message:'data already present',
               data:result
            })
        }
        else{
            let qr=`insert into district(name,state_id) values('${name}','${state_id}')`;
            db.query(qr,(err,result)=>{
                if(err){
                    console.log(err);
                }
             res.send({
                        message:'data inserted'
                    });
             
            })  
        }
    })
    //
    
   
    
})


app.listen(3000,()=>{
    console.log("server is running..")
})