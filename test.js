
const readChunk = require('read-chunk'); // npm install read-chunk
//const isPng = require('is-png');
//测试用依赖
const fs = require('fs');
const path = require('path');
const file_type = require('./file_type');
//测试用依赖

//check();
check_method();

//测试check_file_type
function check(){
    var file_path = __dirname+"\\test"
    var files = fs.readdirSync(file_path);
    files.forEach(function (file_name, index) {
        //var stat = fs.statSync(path + itm);
        //if (stat.isDirectory()) {
        //console.log(file_name+":"+index);     
        var type = path.parse(file_name).ext.toLowerCase();  
        var result = check_file_type(file_path+"\\"+file_name,type);
        console.log(file_name+"'s type is "+type+",check result:"+result); 
    });
}

//测试各个is方法
function check_method(){
    var file_path = __dirname+"\\test"
    var files = fs.readdirSync(file_path);
    files.forEach(function (file_name, index) {
        var type = path.parse(file_name).ext.toLowerCase();
        type = type.substr(1,type.length-1);
        var result = false;
        var new_path = file_path+"\\"+file_name;
        switch(type){
            case 'png':
                result = file_type.isPng(new_path);
                break;
            case 'pdf':
                result = file_type.isPdf(new_path);
                break;
            case 'zip':
                result = file_type.isZip(new_path);
                break;
            case '7z':
                result = file_type.is7z(new_path);
                break;
            case 'rar':
                result = file_type.isRar(new_path);
                break;
            case 'xls':
                result = file_type.isXls(new_path);
                break;
            case 'xlsx':
                result = file_type.isXlsx(new_path);
                break;
            case 'doc':
                result = file_type.isDoc(new_path);
                break;
            case 'docx':
                result = file_type.isDocx(new_path);
                break;
            case 'jpg':
                result = file_type.isJpg(new_path);
                break;
            case 'jpeg':
                result = file_type.isJpeg(new_path);
                break;
            default:
                result = false;
                break;
        }
        console.log(file_name+"'s type is "+type+",check result:"+result); 
    });
    
}

//检查文件类型
function check_file_type(file_path,type){
    const buffer = readChunk.sync(file_path, 0, 8);

    if (!buffer || buffer.length < 8 || !type) {
		return false;
    }
    var result = false;
    //转为小写
    type = type.toLowerCase();
    if(type.indexOf(".") == 0){
        //支持传入后缀
        type = type.substr(1,type.length-1);
    }
    //判断类型
    switch(type){
        case 'png':
            result = (
                    buffer[0] === 0x89 &&
                    buffer[1] === 0x50 &&
                    buffer[2] === 0x4E &&
                    buffer[3] === 0x47 &&
                    buffer[4] === 0x0D &&
                    buffer[5] === 0x0A &&
                    buffer[6] === 0x1A &&
                    buffer[7] === 0x0A
                );
            break;
        case 'pdf':
            result = (
                    buffer[0] === 0x25 &&
                    buffer[1] === 0x50 &&
                    buffer[2] === 0x44 &&
                    buffer[3] === 0x46 
                );
            break;
        case 'zip':
            result = ((
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 
                ) || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x4C &&
                    buffer[3] === 0x49 &&
                    buffer[4] === 0x54 &&
                    buffer[5] === 0x45 
                ) || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x53 &&
                    buffer[3] === 0x70 &&
                    buffer[4] === 0x58 
                )  || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x05 &&
                    buffer[3] === 0x06
                )  || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x07 &&
                    buffer[3] === 0x08
                )  || (
                    buffer[0] === 0x57 &&
                    buffer[1] === 0x69 &&
                    buffer[2] === 0x6E &&
                    buffer[3] === 0x5A &&
                    buffer[4] === 0x69 &&
                    buffer[5] === 0x70 
                )  || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 &&
                    buffer[4] === 0x14 &&
                    buffer[5] === 0x00 &&
                    buffer[6] === 0x01 &&
                    buffer[7] === 0x00   
                )  ) ;
            break;
        case '7z':
            result = (
                    buffer[0] === 0x37 &&
                    buffer[1] === 0x7A &&
                    buffer[2] === 0xBC &&
                    buffer[3] === 0xAF &&
                    buffer[4] === 0x27 &&
                    buffer[5] === 0x1C  
                );
            break;
        case 'rar':
            result = (
                    buffer[0] === 0x52 &&
                    buffer[1] === 0x61 &&
                    buffer[2] === 0x72 &&
                    buffer[3] === 0x21 &&
                    buffer[4] === 0x1A &&
                    buffer[5] === 0x07 &&
                    buffer[6] === 0x00
                );
            break;
        case 'xls':
            result = ((
                buffer[0] === 0xD0 &&
                buffer[1] === 0xCF &&
                buffer[2] === 0x11 &&
                buffer[3] === 0xE0 &&
                buffer[4] === 0xA1 &&
                buffer[5] === 0xB1 &&
                buffer[6] === 0x1A &&
                buffer[7] === 0xE1   
            ) || (
                buffer[0] === 0x09 &&
                buffer[1] === 0x08 &&
                buffer[2] === 0x10 &&
                buffer[3] === 0x00 &&
                buffer[4] === 0x00 &&
                buffer[5] === 0x06 &&
                buffer[6] === 0x05 &&
                buffer[7] === 0x00   
            ) || (
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x10 
            )  || (
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x1F
            )  || (	
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x22
            )  || (
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x23
            )  || (
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x23
            )  || (	
                buffer[0] === 0xFD &&
                buffer[1] === 0xFF &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xFF &&
                buffer[4] === 0x29
            )  ) ;
            break;
        case 'xlsx':
            result = ( (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 
                )  || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 &&
                    buffer[4] === 0x14 &&
                    buffer[5] === 0x00 &&
                    buffer[6] === 0x06 &&
                    buffer[7] === 0x00   )
                );
            break;
        case 'doc':
            result = ((
                buffer[0] === 0xD0 &&
                buffer[1] === 0xCF &&
                buffer[2] === 0x11 &&
                buffer[3] === 0xE0 &&
                buffer[4] === 0xA1 &&
                buffer[5] === 0xB1 &&
                buffer[6] === 0x1A &&
                buffer[7] === 0xE1   
            ) || (
                buffer[0] === 0x0D &&
                buffer[1] === 0x44 &&
                buffer[2] === 0x4F &&
                buffer[3] === 0x43  
            ) || (
                buffer[0] === 0xCF &&
                buffer[1] === 0x11 &&
                buffer[2] === 0xE0 &&
                buffer[3] === 0xA1 &&
                buffer[4] === 0xB1 &&
                buffer[5] === 0x1A &&
                buffer[6] === 0xE1 &&
                buffer[7] === 0x00 
            )  || (
                buffer[0] === 0xDB &&
                buffer[1] === 0xA5 &&
                buffer[2] === 0x2D &&
                buffer[3] === 0x00
            )  || (
                buffer[0] === 0xEC &&
                buffer[1] === 0xA5 &&
                buffer[2] === 0xC1 &&
                buffer[3] === 0x00
            )) ;
            break;
        case 'docx':
            result = ( (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 
                )  || (
                    buffer[0] === 0x50 &&
                    buffer[1] === 0x4B &&
                    buffer[2] === 0x03 &&
                    buffer[3] === 0x04 &&
                    buffer[4] === 0x14 &&
                    buffer[5] === 0x00 &&
                    buffer[6] === 0x06 &&
                    buffer[7] === 0x00 
                ));
            break;
        case 'jpg':
            result = ( (
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE0 
            )  || (	
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE1 
            )  || (	
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE8 )
            );
            break;
        case 'jpeg':
            result = ( (
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE0 
            )  || (	
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE2 
            )  || (	
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF &&
                buffer[3] === 0xE3 )
            );
            break;
        default:
            result = false;
            break;
    }
	return result;
}
