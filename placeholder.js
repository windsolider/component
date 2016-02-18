function Placeholder(inputElem) {
	this.inputElem = inputElem;
	//this.placeholderElem = placeholderElem;
}

$.extend(Placeholder.prototype, {
	init: function() {
        var placeholder = 'placeholder' in document.createElement('input');
        if (!placeholder) {
            this.createPlaceHolderElem();
            if(this.inputElem.val() !== ''){ 
            	this.placeholderElem.hide()
            };
            this.bindEvents();
        }
	},

	createPlaceHolder: function() {
		var placeholder = this.inputElem.attr('placeholder');
		var placeholderElemHtml = '<span class="placeTxt">'+ placeholder +'</span>';
		this.inputElem.parent().append(html);
		this.placeholderElem = $('.placeTxt');
	},

	bindEvents: function() {
		this.inputElem.on('focus', $.proxy(this.handleTargetFocus, this));
		this.inputElem.on('blur', $.proxy(this.handleTargetBlur, this));
		this.placeholderElem.on('click', $.proxy(this.handlePlaceholderClick, this));
	},

	handlePlaceholderClick: function(e) {
		var target = $(e.currentTarget);
		target.hide();
		this.inputElem.focus();
	},

	handleTargetFocus: function() {
		this.placeholderElem.hide();
	},

	handleTargetBlur: function() {
        if(this.inputElem.val() !== '') {
        	return false;
        }
        this.placeholderElem.show();
	}

	//todo add some style for placeholderElem

});