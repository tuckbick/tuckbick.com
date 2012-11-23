<!DOCTYPE html>
<html>
<head>
  <title>Sound-On!</title>
  <?php echo $this->Html->css('soundon', null, array('media' => 'all')) ?>
  <meta name="description" content="HTML5/Javascript Music Sequencer" />
  <meta name="keywords" content="HTML5, Javascript, Audio API, sequencer, frequency, beat, music, notes, song, builder" />
</head>

<body>
  <a href="http://tuckbick.com/projects/soundon"><h1>Sound-On!</h1></a>
  <div id="frame" ></div>
  
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js" ></script>
  <script type="text/javascript">
  
    var grid = (function($){
  
      var options = {
            sampleRate: 32000,
            height: 12,
            width: 24,
            depth: 16,
            bpm: 120
          };
      var map = [], // (x,y), [x][y];
          current_player,
          frame = $('#frame'),
          player = $('<audio>').attr({ src: '' }),
          c_note = 440,
          freqs = [],
          tones = [],
          ticksPerBeat = 4,
          delay = 1500 / (options.bpm / 60 * ticksPerBeat),
          duration = (1/(options.bpm/60))+0.5,
          pos = 0,
          cols,
          playpause,
          timer,
          controls,
          controls2,
          size_h,
          size_w,
          set,
          depth_el,
          freq_els,
          sampleRate_el,
          link_el,
          playing = false,
          
      
      randomNotes = function() {
        var x, y;
        freq_els.each(function(i,el){
          options.freqs[i] = $(el).val();
        });
        for (x=0; x<options.width; ++x) {
          for (y=0; y<options.height; ++y) {
            options.notes[x][y] = (Math.floor(Math.random()*2) == 0);
          }
        }
        resetGrid();
      },
      moveOctaveUp = function() {
        freq_els.each(function(i,el){
          $(el).val($(el).val()*2);
        });
        settings_change();
      },
      moveOctaveDown = function() {
        freq_els.each(function(i,el){
          $(el).val($(el).val()/2);
        });
        settings_change();
      },
      initFreqs = function() {
        var y, base = c_note, h = options.height-1;
        options.freqs = [];
        for ( ; h >= 0; --h) {
          options.freqs.push(Math.pow(2,h/12)*c_note);
        }
      },
      resetGrid = function() {
        var x, y, col, dot;
        
        if (!options.freqs)
          initFreqs();
        
        frame.find('.col').remove();
        col = $('<div class="col ctrl"></div>');
        for (y = 0; y < options.height; ++y) {
          col.append($('<div class="cell ctrl"><label><input class="freq" type="text" value="'+options.freqs[y]+'" />Hz</label></div>'));
        }
        frame.append(col);
        freq_els = $('.freq').change(settings_change);
        
        for ( x = 0; x < options.width; ++x) {
          map[x] = {
            src: '',
            col: []
          }
          col = $('<div class="col chord"></div>');
          for ( y = 0; y < options.height; ++y) {
            if (options.notes)
              map[x].col[y] = (options.notes[x][y] == 1);
            else
              map[x].col[y] = false;
            if (map[x].col[y])
              col.append($('<div class="cell dot on"></div>').data('x',x).data('y',y));
            else
              col.append($('<div class="cell dot"></div>').data('x',x).data('y',y));
          }
          frame.append(col);
          evalCol(x);
        }
        cols = frame.find('.chord');
        $('.dot').click(function() {
          var el = $(this).toggleClass('on');
          toggle(el.data('x'),el.data('y'));
        });
        
        updateLink();
      },
      init = function(settings) {
        
        $.extend(true, options, settings);
        
        controls = $('<div id="controls"></div>');
        
        depth_el = $('<select name="depth"><option selected="selected" value="16">16 bit</option><option value="8">8 bit</option></select>').change(settings_change);
        controls.append($('<label>depth:</label>').append(depth_el));
        
        sampleRate_el = $('<input name="sampleRate" type="text" value="'+options.sampleRate+'">').change(settings_change);
        controls.append($('<label>sample rate:</label>').append(sampleRate_el));
        
        bpm_el = $('<input name="bpm" type="text" value="'+options.bpm+'">').change(settings_change);
        controls.append($('<label>bpm:</label>').append(bpm_el));
        
        size_w = $('<input name="w" type="text" id="size_w" value="'+options.width+'" />');
        controls.append($('<label>width:</label>').append(size_w));
        size_h = $('<input name="h" type="text" id="size_h" value="'+options.height+'" />');
        controls.append($('<label>height:</label>').append(size_h));
        
        set = $('<input type="button" value="resize" />').click(function() {
          options.width = size_w.val();
          options.height = size_h.val();
          options.notes = null;
          resetGrid();
        });
        controls.append(set);
        
        playpause = $('<input type="button" value="play" />').toggle(function() {
          start();
          playpause.val('pause');
          playing = true;
        }, function() {
          pause();
          playpause.val('play');
          playing = false;
        });
        controls.append(playpause);
        
        link_el = $('<input id="link" type="text" />');
        controls.append(link_el);
        
        frame.append(controls);
        
        
        controls2 = $('<div id="controls2"></div>');
        controls2.append($('<input type="button" value="octave +" />').click(moveOctaveUp));
        controls2.append($('<input type="button" value="octave -" />').click(moveOctaveDown));
        controls2.append($('<input type="button" value="randomize notes" />').click(randomNotes));
        
        frame.append(controls2);
        
        resetGrid();
        
      },
      settings_change = function() {
        options.sampleRate = sampleRate_el.val();
        options.depth = depth_el.val();
        if (options.bpm != bpm_el.val()) {
          options.bpm = bpm_el.val();
          delay = 1500 / (options.bpm / 60 * ticksPerBeat),
          duration = (1/(options.bpm/60))+0.5;
          if (playing)
            changeDelay();
        }
        freq_els.each(function(i,el){
          options.freqs[i] = $(el).val();
        });
        for (var x = 0; x < options.width; ++x) {
          evalCol(x);
        }
        updateLink();
      },
      updateLink = function() {
        link_el.val(window.location.origin+window.location.pathname+'?'+$.param(grid.toObject()));
      },
      encodeAudio8bit = function(data, sampleRate) {
        var n = data.length;
        var integer = 0, i;
  
        // 8-bit mono WAVE header template
        var header = "RIFF<##>WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00<##><##>\x01\x00\x08\x00data<##>";

        // Helper to insert a 32-bit little endian int.
        function insertLong(value) {
          var bytes = "";
          for (i = 0; i < 4; ++i) {
            bytes += String.fromCharCode(value % 256);
            value = Math.floor(value / 256);
          }
          header = header.replace('<##>', bytes);
        }

        // ChunkSize
        insertLong(36 + n);
  
        // SampleRate
        insertLong(sampleRate);

        // ByteRate
        insertLong(sampleRate);

        // Subchunk2Size
        insertLong(n);
  
        // Output sound data
        for (var i = 0; i < n; ++i) {
          header += String.fromCharCode(Math.round(Math.min(1, Math.max(-1, data[i])) * 127 + 127));
        }
  
        return 'data:audio/wav;base64,' + btoa(header);
      },
      encodeAudio16bit = function(data, sampleRate) {
        var n = data.length;
        var integer = 0, i;
  
        // 16-bit mono WAVE header template
        var header = "RIFF<##>WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00<##><##>\x02\x00\x10\x00data<##>";

        // Helper to insert a 32-bit little endian int.
        function insertLong(value) {
          var bytes = "";
          for (i = 0; i < 4; ++i) {
            bytes += String.fromCharCode(value % 256);
            value = Math.floor(value / 256);
          }
          header = header.replace('<##>', bytes);
        }

        // ChunkSize
        insertLong(36 + n * 2);
  
        // SampleRate
        insertLong(sampleRate);

        // ByteRate
        insertLong(sampleRate * 2);

        // Subchunk2Size
        insertLong(n * 2);
  
        // Output sound data
        for (var i = 0; i < n; ++i) {
          var sample = Math.round(Math.min(1, Math.max(-1, data[i])) * 32767);
          if (sample < 0) {
            sample += 65536; // 2's complement signed
          }
          header += String.fromCharCode(sample % 256);
          header += String.fromCharCode(Math.floor(sample / 256));
        }
  
        return 'data:audio/wav;base64,' + btoa(header);
      },
      generateTone = function (freq){
        var tone = []
        for(var i = 0; i < duration * options.sampleRate; ++i){
          //tone.push( (2*Math.sin(2 * Math.PI * i / (options.sampleRate/freq))) % Math.cos(2 * Math.PI * i / (options.sampleRate/freq))  );
          tone.push(Math.sin(2 * Math.PI * i / (options.sampleRate/freq)));
        }
        return tone;
      },
      toggle = function(x, y) {
        map[x].col[y] = !map[x].col[y];
        evalCol(x);
        updateLink();
      },
      evalCol = function(x) {
        data = [];
        for (var y = 0; y < options.height; ++y) {
          if (!map[x].col[y]) continue;
          var data1 = generateTone(options.freqs[y], options.sampleRate, duration);
          var n = data1.length;
          for (var i = 0; i < n; ++i) {
            if (data[i] === undefined) {
              data[i] = data1[i];
            } else {
              data[i] = data[i] + data1[i];
            }
          }
        }
        if (options.depth == 8)
          map[x].src = encodeAudio8bit(data,options.sampleRate);
        else if (options.depth == 16)
          map[x].src = encodeAudio16bit(data,options.sampleRate);
      },
      mod_col = function(x) {
        x %= options.width;
        while (x < 0)
          x += options.width;
        return x;
      },
      advancePattern = function() {
        //player[0].pause();
        player.attr({ src: map[pos].src });
        cols.removeClass('playing');
        $(cols[pos]).addClass('playing');
        pos = mod_col(pos + 1);
        player[0].load();
        player[0].play();
      },
      start = function() {
        player.attr({ src: map[pos].src });
        timer = setInterval(advancePattern, delay);
      },
      changeDelay = function() {
        clearInterval(timer);
        timer = setInterval(advancePattern, delay);
      },
      pause = function() {
        clearInterval(timer);
        pos = 0;
        cols.removeClass('playing');
        player[0].pause();
      },
      toObject = function() {
        var x, y, col;
        options.notes = []
        for (x = 0; x < options.width; ++x) {
          col = [];
          for (y = 0; y < options.height; ++y) {
            col[y] = (map[x].col[y]?1:0);
          }
          options.notes[x] = col;
        }
        return options;
      }
      return {
        init: init,
        toObject: toObject
      };
  
    })(jQuery);
    
    $(document).ready(function(){
  
      <?php
      $params = json_encode($this->request->query);
      if (!$params)
        $params = null;
      ?>
      grid.init(<?php echo $params ?>);

      
    });

    
  </script>
  <?php echo $this->element('analytics', array(
    'title_for_layout' => 'Sound-On'
  )) ?>
</body>
</html>