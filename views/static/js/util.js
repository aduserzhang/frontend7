define(function(){
	return {
		getQueryObj:function(){
				var queryString = location.search.slice(1);
			 	var obj = {};
			 	//将获取到的字符串转换成数组
			 	var kvPairs = queryString.split("&");
			 	//遍历这个数组
			 	for(var i=0; i< kvPairs.length; i++){
			 		//拿到数组中的每一项 key = value
			 		var kvPair = kvPairs[i];
			 		//将数组里的等号去掉 ["id", "33"]
			 		var kvArr = kvPair.split("=");
			 		obj[kvArr[0]] = decodeURI(kvArr[1]);
			 	}
			 	return obj;
			},
			getQuery:function(){
					return getQueryObj()[key];
			}
	  }
})