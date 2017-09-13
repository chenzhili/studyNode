let fs=require('fs');
/*
let url='img/home.png'
let rs=fs.readFileSync(url,{encoding:'hex',flag:'r'});
let write=(e)=>{
    fs.writeFileSync(e,rs,{encoding:'hex',flag:'w'})
};
glob('dist/right.png',(err,files)=>{
    console.log(files);
    files.forEach(write)
});*/
/**
 * 这是为了在不改变原图片名字的情况下，修改图片资源
 * @param url
 * @param dist
 */
function copy(url,dist){
    let rs = fs.readFileSync(url,{encoding:'hex',flag:'r'});
    /*glob(dist,(err,data)=>{
        console.log(data);
        fs.writeFileSync(data[0],rs,{encoding:'hex',flag:'w'})
    });*/
    fs.writeFileSync(dist,rs,{encoding:'hex',flag:'w'})
}
copy("img/ssc_result_bg.png","dist/refresh.png");