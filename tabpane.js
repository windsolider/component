function TabPane(option) {
	this.activeClass = option.activeClass;
}

TabPane.prototype.index = 0;

$.extend(TabPane.prototype, {

	init: function(tabs, panes) {
		this.tabs = $(tabs);
		this.panes = $(panes);
		this.bindEvents();
	},

	bindEvents: function() {
		this.tabs.on('click', this.handleTabsClick);
	},

	handleTabsClick: function(e) {
		var index = this.tabs.index(e.currentTarget);
		this.setIndex(index);
	},

	getIndex: function() {
		return this.index;
	},

	setIndex: function(index) {
		if (this.index !== index) {
			this.setTabActive(this.index, false);
			this.setPaneActive(this.index, false);
			this.setTabActive(index, true);
			this.setPaneActive(index, true);
			this.index = index;
			$.event.trigger('select', [index], this);
		}
	},

	setTabActive: function(index, active) {
		var tab = this.getTab(index);
		if (active) {
			tab.addClass(this.activeClass);
		} else {
			tab.removeClass(this.activeClass);
		}
	},

	setPaneActive: function(index, active) {
		var pane = this.getPane(index);
		if (active) {
			pane.show();
		} else {
			pane.hide();
		}
	},

	getTab: function(index) {
		return this.tabs.eq(index);
	},

	getPane: function(index) {
		return this.panes.eq(index);
	}

});