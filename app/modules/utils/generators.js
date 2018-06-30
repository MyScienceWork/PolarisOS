function gen_async(makeGenerator) {
    return function () {
        const generator = makeGenerator.apply(this, arguments);

        function handle(result) {
      // result => { done: [Boolean], value: [Object] }
            if (result.done) return Promise.resolve(result.value);

            return Promise.resolve(result.value).then(res => handle(generator.next(res)), err => handle(generator.throw(err)));
        }

        try {
            return handle(generator.next());
        } catch (ex) {
            return Promise.reject(ex);
        }
    };
}

module.exports = {
    gen_async,
};
