/**
 * 该文件专门用来处理数据格式的函数封装
 **/

let dateFmt= function (fmt) {
    return fmt.replace(/T/g," ");
}

export default { dateFmt };