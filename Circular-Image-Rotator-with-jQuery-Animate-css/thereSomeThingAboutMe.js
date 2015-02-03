 thereSomeThingAboutMe = {
        /**
         * a code by Seyhan YILDIZ
         */
        settings: {
            pictures: ['1.jpg', '2.jpg', '3.jpg'],
            object: '#myPic',
            inAnimation: 'flipInX',
            outAnimation: 'flipOutY',
            random: true,
            startNumber: 0,
            time: 5000 //ms
        },
        
        prePic: null,

        random: function () {
            var rN = Math.random() * (this.settings.pictures.length - 1);
            rN = Math.round(rN);
            return rN;
        },


        run: function (par) {
        /**
         * Ön tanımlamalar
         */ 

            $.extend(this.settings,par);

            var c = this.settings.pictures.length;
            var s = this.settings.inAnimation;
            var e = this.settings.outAnimation;
            var p = this.settings.pictures;

            if (c <= 1) return; //1 resim ve aşağısında olayın iptali


            /**
             *rasgele yada sıralı algılanması
             */

            if (this.settings.random) {
                /**
                 *  Şu kısım arka arkaya aynı resimin gelmemesini sağlıyor
                 * @type {*}
                 */
                var rN = this.random();
                while (rN == this.prePic) {
                    rN = this.random();
                }
                this.prePic = rN;
            } else {
                /**
                 *  Sıraki resim yoksa başa alma vs..
                 */
                if (typeof this.settings.pictures[this.settings.startNumber + 1] != 'undefined') {
                    this.settings.startNumber++;
                } else {
                    this.settings.startNumber = 0;
                }

                rN = this.settings.startNumber;
            }


            $(this.settings.object).queue(function () {
                $(this).removeClass(s).addClass(e).dequeue();
            }).delay(500).queue(function () {
                $(this).removeClass(e).attr('src', 'images/' + p[rN]).addClass(s).dequeue();
            })


            setTimeout(' thereSomeThingAboutMe.run()', this.settings.time);
        }

    }