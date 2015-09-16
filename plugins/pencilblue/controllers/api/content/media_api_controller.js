/*
    Copyright (C) 2015  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

module.exports = function(pb) {

    //PB dependencies
    var util            = pb.util;
    var MediaService    = pb.MediaService;
    var SecurityService = pb.SecurityService;

    /**
     *
     * @class MediaApiController
     * @constructor
     * @extends BaseApiController
     */
    function MediaApiController(){}
    util.inherits(MediaApiController, pb.BaseApiController);

    /**
     * Initializes the controller
     * @method init
     * @param {Object} context
     * @param {Function} cb
     */
    MediaApiController.prototype.init = function(context, cb) {
        var self = this;
        var init = function(err) {

            /**
             *
             * @property service
             * @type {MediaService}
             */
            self.service = new MediaService(self.getServiceContext());

            cb(err, true);
        };
        MediaApiController.super_.prototype.init.apply(this, [context, init]);
    };

    MediaApiController.prototype.processWhere = function(q) {
        var where = null;
        var failures = [];

        //build query & get results
        var search = q.q;
        if (pb.ValidationService.isNonEmptyStr(search, true)) {

            var patternStr = ".*" + util.escapeRegExp(search) + ".*";
            var pattern = new RegExp(patternStr, "i");
            where = {
              name: pattern
            };
        }

        return {
            where: where,
            failures: failures
        };
    };

    //exports
    return MediaApiController;
};
