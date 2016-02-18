function Pagination(pagination) {
	this.pagesContainer = $(pagination);
}

Pagination.defaultSettings = {
	pageIndex: 1,
	total: 20,
	step: 5,
	controlClass: 'page-ctrl',
	currentClass: 'active',
	prevClass: 'page-ctrl',
	nextClass: 'page-ctrl',
	firstText: '首页',
	lastText: '尾页',
	prevText: '上一页',
	nextText: '下一页',
	controlTempl: '<span class="{$className}"  data-pageno="{$pageNo}">{$btnText}</span>',
	firstCtrl: true,
	lastCtrl: true,
	prevCtrl: true,
	nextCtrl: true,
	showFirstLastBtn: true,
	showPrevNextBtn: true,
};

$.extend(Pagination.prototype, {
	
	init: function(option) {
		this.settings = $.extend({}, Pagination.defaultSettings, option);

		//this.createRecordCount(this.settings.total);
		this.createPagination();

		this.bindEvents();
	},

	bindEvents: function() {
		this.pagesContainer.on('click', 'span', $.proxy(this.handlePageClick, this));
	},

	handlePageClick: function(e) {
		var target = e.currentTarget;
		var num = parseInt($(target).attr('data-pageno'), 10);
		this.updatePagination(num, this.settings.total);
		$.event.trigger('switch', [num]);
	},

	updatePagination: function(to, total) {
		this.renderPagination(to, total);
	},

	createRecordCount: function(recordCount) {
		var recordCountHtml = '<span id="recordCount">共 <b>' + recordCount + '</b> 条记录 </span>';
		this.pagesContainer.append(recordCountHtml);
	},

	setRecordCount: function(recordCount) {
		this.recordCount = recordCount;
	},

	createPagination: function() {
		var to = parseInt(this.settings.pageIndex, 10);
		var total = parseInt(this.settings.total, 10);
		this.renderPagination(to, total);
	},

	renderPagination: function(to, total) {
		var paginationHtml = '<div id="pagination">';
		paginationHtml += this.renderHtml(to, total);
		paginationHtml += '</div>';
		this.pagesContainer.append(paginationHtml);
	},

	createCore: function(to, total, step) {
		if (!to || !total) {
			return false;
		}

		var to = parseInt(to, 10);
		var total = parseInt(total, 10);
		var step = step;
		var pages = [];
		if (total === 1 || to <= 0 || to >= total) {
			return false;
		} else if (total <= 2 * step) {
			for (var i = 1; i <= total; i++) {
				pages.push(i);
			}
		} else if (to <= step) {
			for (var i = 1; i <= 2 * step + 1; i++) {
				pages.push(i);
			}	
		} else if (to >= total - step) {
			for (var i = total - 2 * step; i <= total; i++) {
				pages.push(i);
			}
		} else {
			for (var i = to-step; i <= to + step; i++) {
				pages.push(i);
			}
		}
		return pages;
	},

	createBeginning: function(to, total) {
		var data = this.createCore(to, total, this.settings.step);
		var beginning = [];
		if (this.settings.firstCtrl && data[0] !== 1) {
			beginning.push(this.settings.firstText || 1);
		}
		if (this.settings.prevCtrl && to !== 1) {
			beginning.push(this.settings.prevText || '上一页');
		}
		return beginning;
	},

	createEnding: function(to, total) {
		var data = this.createCore(to, total, this.settings.step);
		var ending = [];
		if (this.settings.lastCtrl && data[data.length - 1] !== total) {
			ending.unshift(this.settings.lastText || total)
		}
		if (this.settings.nextCtrl && to !== total) {
			ending.unshift(this.settings.nextText || '下一页');
		}
		return ending;
	},

	joinData: function(to, total) {
		var coreData = this.createCore(to, total, this.settings.step);
		var beginningData = this.createBeginning(to, total);
		var endingData = this.createEnding(to, total);
		var paginationData =  Array.prototype.push.apply(beginningData, coreData);
		paginationData = Array.prototype.push.apply(paginationData, endingData);
		return paginationData;
	},

	renderHtml: function(to, total) {
		var paginationTempl = [];
		var initTempl = this.settings.controlTempl;
		var data = this.joinData(to, total);
		$.each(data, function(index, item){
			var pageFix = item;
			var className = this.settings.controlClass;
			var baseTempl = initTempl;
			if (item === this.settings.firstText) {
				pageFix = 1;
			}
			if (item === this.settings.lastText) {
				pageFix = total;
			}
			if (item === this.settings.prevText) {
				pageFix = to - 1;
				className = this.settings.prevClass;
			}
			if (item === this.settings.nextText) {
				pageFix = to + 1;
				className = this.settings.nextClass;
			}
			if (item === to) {
				className = this.settings.currentClass;
				baseTempl = this.settings.currentTempl;
			}

			var html = baseTempl.replace('{$pageNo}', pageFix);
			html = baseTempl.replace('{$btnText}', item);
			html = baseTempl.replace('{$className}', className);
			paginationTempl.push(html);
		});
		return paginationTempl.join('');
	}
	
});

module.exports = Pagination;