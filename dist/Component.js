sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","sap/btp/ux410solving/model/models"],function(e,t,i){"use strict";return e.extend("sap.btp.ux410solving.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
//# sourceMappingURL=Component.js.map