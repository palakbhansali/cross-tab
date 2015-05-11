/**
 * Created by Dhingu on 4/30/15.
 */
Uploads = new FS.Collection('uploads',
    {
        stores: [new FS.Store.FileSystem('uploads', {path: './public/imports'})]
    });
Uploads.allow({
    insert  : function () {
        return true
    },
    update  : function () {
        return true
    },
    remove  : function () {
        return true
    },
    download: function () {
        return true
    }
});
