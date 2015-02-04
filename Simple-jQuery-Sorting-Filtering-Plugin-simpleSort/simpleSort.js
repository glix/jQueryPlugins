
var simpleSort = function(parent, child, hiddenClass) {
    this.stashBox = $(parent);
    this.stashItems = this.stashBox.children(child);
    this.order = ''; // used for external toggle check
    this.hiddenClass = hiddenClass;

    this.sort = function(dataAttribute, order) {

        order = (order === 'asc' || order === 'desc' ? order : 'desc');

        this.order = order;

        this.stashItems.sort( function(a,b) {

            var an = a.getAttribute(dataAttribute);
            var bn = b.getAttribute(dataAttribute);

            if(order === 'desc') {

                if(an > bn) {
                    return 1;
                }
                if(an < bn) {
                    return -1;
                }
                return 0;

            } else if (order === 'asc') {

                if(an < bn) {
                    return 1;
                }
                if(an > bn) {
                    return -1;
                }
                return 0;

            }

        });

        this.stashItems.detach().appendTo(this.stashBox);
    };

    this.filter = function(dataAttribute, filterVal) {

        this.stashItems.each( function() {

            var dataVal = this.getAttribute(dataAttribute).toLowerCase();
            var findVal = filterVal.toLowerCase();

            if( (dataVal.indexOf(findVal)) === -1) {

                if(this.hiddenClass === undefined) {
                    $(this).css('display', 'none');
                } else {
                    $(this).addClass(this.hiddenClass);
                }

            } else {
                undoHide(this);
            }
        });

    };

    this.all = function() {
        this.stashItems.each( function() {
            undoHide(this);
        });
    };

    // private
    undoHide = function(el) {

        if(this.hiddenClass === undefined) {
            $(el).removeAttr('style');
        } else {
            $(el).removeClass(this.hiddenClass);
        }

    }

};