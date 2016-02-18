function Tips() {

	this.targets = [];
}

$.extend(Tips.prototype, {
	init: function() {

		this.attachTargets();
	},

	attachTargets: function(targets) {
		if (targets.length) {
			for(var i = 0, len = targets.length; i < len; i++) {
				var target = targets[i];
				if ($.inArray(target, this.targets) === -1) {
					this.targets.push(target);
					this.bindTargetEvents(target);
				}
			}
		}

		if (!this.getElement()) {
			this.createDom();
			this.getElement().appendTo('body');
		}

		this.bindEvents();
	},

	bindTargetEvents: function(target) {
		target.on('mouseenter', $.proxy(this.handleTargetsMouseenter, this));
		target.on('mouseleave', $.proxy(this.handleTargetsMouseleave, this));
	},

	getElement: function() {
		return this.element;
	},

	bindEvents: function() {
		this.element.on('mouseenter', $.proxy(this.handleTargetsMouseenter, this));
		this.element.on('mouseleave', $.proxy(this.handleTargetsMouseleave, this));
	},

	handleTargetsMouseleave: function(e) {
		var target = e.target;
		$.event.trigger('mouseleave', [$(target)]);
	},

	handleTargetsMouseenter: function(e) {
		var target = e.target;
		$.event.trigger('mouseenter', [$(target)]);
	},

	createDom: function() {
		var elem = $('<div class="card"><div class="card-icon"></div></div>');
		elem.css("display", this.visible ? "block" : "none");
		var contentElem = $('<div class="card-content"></div>');
		contentElem.appendTo(elem);

		this.setElement(elem);
	},

	setElement: function(elem) {
		this.element = elem;
	},

	setVisible: function(visible) {
		if (this.visible != visible) {
			this.getElement()&&this.getElement().css("display", visible ? "block" : "none");
			this.visible = visible;
		}
	},

	show: function() {
		this.setVisible(true);
	},

	hide: function() {
		this.setVisible(false);
	}	
});