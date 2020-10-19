/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function(document) {
    var model = {
        name_list:[ 
            'Slappy the Frog',
            'Lilly the Lizard',
            'Paulrus the Walrus',
            'Gegory the Goat',
            'Adam the Anaconda'],
        init: function() {
          if (!localStorage.attendance) {
              var attendance = {}
              model.name_list.map(function(k) {
                  attendance[k] = Array(12).fill(null).map(
                                   function(){return Math.random()>0.5;});
              });
              localStorage.attendance = JSON.stringify(attendance);
          }
       },
       getAllAttendance: function() {
         return JSON.parse(localStorage.attendance);
       },
       storeAllAttendance: function(allAttendance) {
           localStorage.attendance = JSON.stringify(allAttendance);
       },
    }

    var octopus = {
        init: function() {
            model.init();
            view.init();
            view.render();
        },
        getAllAttendance: function() {
            return model.getAllAttendance();
        },
        getMissingCount: function(k) {
            return model.getAllAttendance()[k].filter(function(v){return v == false}).length;
        },
        updateAttendance: function(k, i, v) {
            var allAttendance = this.getAllAttendance();
            allAttendance[k][i] = v;
            model.storeAllAttendance(allAttendance);
        }
    }

    var view = {
      init: function() {
        var attendance = octopus.getAllAttendance();
        var student_table = document.getElementById('student_table');
        var html_str = '';
        Object.keys(attendance).map(function(k) {
          html_str += '<tr class="student">';
          html_str += '<td class="name-col">' + k + '</td>';
          attendance[k].map(function(check){
            html_str += '<td class="attend-col">';
            html_str += '<input type="checkbox" class="' + k +'" ';
            if (check) {
                html_str += 'checked="checked"'
            }
            html_str += '></td>';
          });
          html_str += '<td class="missed-col" id="missed-' + k +'"></td>'
          html_str += '</tr>';
        });
        student_table.innerHTML = html_str;
        var checkbox_array = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i<  checkbox_array.length; i++) {
          /* closure to pass i to event listner */
          (function(idx) {
            checkbox_array[i].addEventListener('change', function() {
              var index = idx% 12;
              octopus.updateAttendance(this.className, index, this.checked);
              view.render();
            })
          })(i);
        }
      },
      render: function() {
         var attendance = octopus.getAllAttendance();
         Object.keys(attendance).map(function(k) {
           var missed = document.getElementById("missed-" + k);
           missed.textContent = octopus.getMissingCount(k);
         });
      }
    }
    octopus.init();
}(document));
