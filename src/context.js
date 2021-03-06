window.stik || (window.stik = {});

(function(){
  function Context(controller, action, template, executionUnit){
    if (!controller)    { throw "controller is missing"; }
    if (!action)        { throw "action is missing"; }
    if (!template)      { throw "template is missing"; }
    if (!executionUnit) { throw "execution unit is missing"; }

    this.$$controller = controller;
    this.$$action = action;
    this.$$template = template;
    this.$$executionUnit = executionUnit;
    this.$$disposable = false;
    this.$$viewBag = new stik.ViewBag(template);
  }

  Context.prototype.$load = function(modules){
    var dependencies = this.$resolveDependencies(
      this.$mergeModules(modules)
    );

    this.$$executionUnit.apply({}, dependencies);
  };

  Context.prototype.$mergeModules = function(modules){
    modules.$context = this;
    modules.$template = this.$$template;
    modules.$viewBag = this.$$viewBag;

    return modules;
  };

  Context.prototype.$resolveDependencies = function(modules){
    var injector = new stik.Injector(this.$$executionUnit, modules);

    return injector.$resolveDependencies();
  };

  stik.Context = Context;
})();
