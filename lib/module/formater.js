/**
 * @description 格式化集合
 */

exports.formatNull = function(val){
	//对空数据进行统一处理
	return (val === null || val === undefined || val === "") ? "" : val; 
};

exports.formatDate = function(val, formatPatter){
	//val为要格式化的值，formatPatter为格式，如YY-mm-dd HH-MM-SS,可以参考别的库。
	return val;
}