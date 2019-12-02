class Services {
    constructor() {
        this.dataType = "json";
    }

    create(resource, data, callback) {
        const dataType = this.dataType;
        $.ajax({
            url:      resource,
            type:     "POST",
            dataType: dataType,
            data:     data,
            success:  function (result) {
                callback(null, result)
            },
            error: function (err) {
                callback(err);
            }
        });
    }

    put(resource, data, callback) {
        const dataType = this.dataType;
        $.ajax({
            url:      resource,
            type:     "PUT",
            dataType: dataType,
            data:     data,
            success:  function (result) {
                callback(null, result)
            },
            error: function (err) {
                callback(err);
            }
        });
    }

    read(resource, callback) {
        const dataType = this.dataType;
        $.ajax({
            url:      resource,
            type:     "GET",
            dataType: "html",
            success:  function (result) {
                callback(null, result);
            },
            error: function (err) {
                callback(err);
            }
        })
    }
}