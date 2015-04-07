(function(params){

  Polymer('olos-delay', {

    // delayType: 'samples', // or 'milliseconds'
    samplesOrMillis: 1000,
    delayFactor: 'samples',

    // inputs and outputs
    inputAudio: null,
    delayTimeParam: null,
    output: null,

    rootfolder: '../olos-delay/',

    sliderValue: 500,
    width:300,
    height:100,

    ready: function() {
      var self = this;
      self._audioContext = audioContext;


      self.inputAudio = audioContext.createGain();
      self.delay = audioContext.createDelay();

      self.delayTimeParam = self.delay.delayTime;

      self._init();

      self.output = audioContext.createGain();

      self.inputAudio.connect(self.delay);
      self.delay.connect(self.output);
    },

    _init: function() {
      var self = this;
      self.setDelayType();
      self.setDelayTime();
    },

    setDelayTime: function(e, detail){
      var self = this;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      self.delay.delayTime.value = self.sliderValue / self.samplesOrMillis;
      // console.log(this.delay.delayTime.value);
    },

    setDelayType: function(e, detail){
      var self = this;
      if (detail){
        self.delayFactor = detail.item.innerText.toLowerCase();
      } else {
        console.log('no type');
        self.delayFactor = 'Samples';
        self.$.selector.selected = ['samples'];
      }
      if (self.delayFactor === 'samples') {
        self.samplesOrMillis = 44100;
      } else {
        self.samplesOrMillis = 1;
      }
      self.setDelayTime();
    },

    animate: function() {
      // TO DO
      // this.sliderValue = 
    },

    dispose: function() {
      var self = this;

      // remove audio elements
      var nodes = ['inputAudio', 'delay', 'output'];
      for (var i = 0; i < nodes.length; i++) {
        try {
          var node = self[nodes[i]];
          node.disconnect();
          node = null;
        } catch(e) { }
      }
    }

  });

})();