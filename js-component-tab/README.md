## 组件功能

将固定模板的DOM结构做成tab选项卡

## 组件实现方式

通过构造函数的方式，将实现tab选项卡功能的函数放入原型对象prototype中，每个实例都可以调用

## 使用方式

HTML

```
<div class="tab-container">
	<div class="tabs clearfix">
		<span class="active">1</span>
		<span>2</span>
		<span>3</span>
	</div>
	<div class="tab-content">
		<div class="content active">这是内容1</div>
		<div class="content">这是内容2</div>
		<div class="content">这是内容3</div>
	</div>			
</div>
```
调用

```
var tab1 = new Tab(document.querySelectorAll('.tab-container')[0]);

tab1.init();
```