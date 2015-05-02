/// <reference path="references.ts" />

module xjs {

	'use strict';

	export class InstagramBackgroundCtrl {

		public static $inject = ['$element', '$http', '$interval'];

		public static USER_ID_PLACEHOLDER = '##USER-ID##';
		public static CLIENT_ID_PLACEHOLDER = '##CLIENT-ID##';

		public static FETCH_IMAGES_URL = 'https://api.instagram.com/v1/users/##USER-ID##/media/recent/?client_id=##CLIENT-ID##&callback=JSON_CALLBACK';

		private clientId: string;

		private userId: string;

		public constructor(
			private $element: ng.IAugmentedJQuery,
			private $http: ng.IHttpService,
			private $interval: ng.IIntervalService) {

			this.clientId = $element.attr('client-id');
			this.userId = $element.attr('user-id');
			this.init();
		}

		public init(): void {
			var url = InstagramBackgroundCtrl.FETCH_IMAGES_URL;
			url = url.replace(InstagramBackgroundCtrl.CLIENT_ID_PLACEHOLDER, this.clientId);
			url = url.replace(InstagramBackgroundCtrl.USER_ID_PLACEHOLDER, this.userId);

			this.$element.css('transition', 'background-image 4s ease-in-out');

			var promise = this.$http.jsonp(url, null);
			promise.success((response: any) => {
				var url: string,
					index: number;

				this.setBackground(response);

				this.$interval(() => {
					this.setBackground(response);
				}, 10 * 1000);

			});
		}

		public setBackground(response: any): void {
			var index: number = this.random(0, response.data.length),
				url: string = response.data[index].images.standard_resolution.url,
				image: HTMLImageElement = new Image(),
				that = this;

			image.onload = function() {
				that.$element.css('background-image', 'url(' + this.src +')');
			}
			image.src = url;
		}

		public random(min: number, max: number): number {
			return Math.floor(Math.random() * max) + min;
		}

	}

}