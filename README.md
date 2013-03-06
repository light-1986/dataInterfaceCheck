dataInterfaceCheck
========

Version 1.0.1 - Wed 6 Mar 2013

by W.Mr

Introduction
------------
通过接口对后台返回数据进行检测

json的key对应源数据中的key，或者自定义的key，value赋值为一个函数，去源数据中对应的同级或子级中取得想要的值，通过这样就可以不仅可以把自己想要的数据提取出来，还可以纠正json格式，这样当后台数据格式发生变化时，我们仅改变接口就可以达到效果。

如果另外的项目如何向使用这套数据，那模版只要按接口文件去写，就可以正常使用。这样一来，我们就可以减少对后台的依赖。通过数据接口提取数据进行自测和单测。

	var port = {
		"countTotal": "boolean",
		"order": [					//order 作为关键字用来检测result的排序结果
			{
				"title"	:"name",
				"type"	:"desc"
			}, 
			{
				"title"	:"speaker.name",
				"type"	:"asc"
			}
		],
		"pageNo": "number",
		"pageSize": "number",
		"result":[{
			//"coverPath": "img",							//这个是前台要的
			"tlength": "time",							//这个是前台要的
			"name": "notNull",							//这个是前台要的
			"recommendCount": function(v){
				//这里可以访问还未读取出来的this.speaker.name原理是，函数加入队列，在其他属性读取完开始执行。
				//console.log(this.speaker.name)			
				return this.speaker.name + " == " + v
			},									//这个是前台要的
			"speaker": {									
				"name": "notNull"						//这个是前台要的
			},
			"viewCount": "number"
		}]
	};
