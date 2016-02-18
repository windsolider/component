
function Switch(containerElem, buttonContainerElem) {
    this.containerElem = containerElem;
    this.parentContainer = this.containerElem.parent();
    this.buttonContainerElem = buttonContainerElem;
    this.switchElem = this.containerElem.children();
    this.buttonElem = this.buttonContainerElem.children();
    this.index = 1;
}
$.extend(Switch.prototype, {

    init: function() {
        this.decorate();
        this.bindEvents();
    },

    decorate: function() {
        var switchElemHeight = this.switchElem.eq(0).height();
        this.containerElem.css({position: 'relative', height: switchElemHeight});
        this.switchElem.css({position: 'absolute', zIndex:1, left: 0 ,top: 0});
        this.switchElem.eq(0).css({zIndex:6});
    },

    bindEvents: function() {
        this.buttonElem.on('click', $.proxy(this.handleButtonClick, this));
        this.parentContainer.on('mouseover', $.proxy(this.handleSwitchMouseover, this));
        this.parentContainer.on('mouseout', $.proxy(this.handleSwitchMouseout, this));
    },

    handleSwitchMouseover: function() {
        clearInterval(this.iTimer);
    },

    handleSwitchMouseout: function() {
        this.autoPlay();
    },

    handleButtonClick: function(e) {
        var index = this.buttonElem.index(e.currentTarget);
        this.setIndex(index-1);
        return false;
    },

    setIndex: function(index) {
        if (index >= 1) {
            index = 0;
        } else {
            index++;
        }
        if (this.index !== index) {
            this.switchElem.eq(this.index).css({zIndex: 1}).fadeOut(1000);
            this.switchElem.eq(index).css({zIndex: 6}).fadeIn(1000);
            this.buttonElem.eq(this.index).removeClass('active');
            this.buttonElem.eq(index).addClass('active');
            this.index = index;
        }
    },

    autoPlay: function() {
        clearInterval(this.iTimer);
        var that = this;
        this.iTimer = setInterval(function(){
            that.setIndex(that.index);
        }, 2000);
    }

});

module.exports = Switch;
