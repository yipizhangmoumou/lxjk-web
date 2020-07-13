let dateFmt= function (fmt) {
    var json_date = new Date(fmt).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") 

}

export default { dateFmt };