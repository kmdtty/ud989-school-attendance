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
                  attendance[k] = Array(11).fill(null).map(
                                   function(){return Math.random()>0.5;});
              });
              localStorage.attendance = JSON.stringify(attendance);
          }
       },
       getAllAttendance: function() {
         return JSON.parse(localStorage.attendance);
       }
    }
    var octopus = {
        init: function() {
            model.init();
            view.init();
        },
        getAllAttendance: function() {
            return model.getAllAttendance();
        },
        getMissingCount: function(k) {
            return model.getAllAttendance()[k].filter(function(v){return v == false}).length;
        },
    }
    var view = {
        /*
         *      <tr class="student">
                    <td class="name-col">Slappy the Frog</td>
                    <td class="attend-col"><input type="checkbox"></td>
                    <td class="attend-col"><input type="checkbox"></td>
                    ...
                    <td class="missed-col">0</td>
                </tr>
         */
        init: function() {
            var attendance = octopus.getAllAttendance();
            var student_table = document.getElementById('student_table');
            var student_tr = document.createElement('tr');
            var html_str = '';
            Object.keys(attendance).map(function(k) {
              html_str += '<tr class="student">';
              html_str += '<td class="name-col">' + k + '</td>';
              attendance[k].map(function(check){
                html_str += '<td class="attend-col"><input type="checkbox"';
                if (check) {
                    html_str += 'checked="checked"'
                }
                html_str += '></td>';
              });
              html_str += '<td class="missed-col">' + octopus.getMissingCount(k) + '</td>'
              html_str += '</tr>';
            });
            student_table.innerHTML = html_str;
        },
        render: function() {
        }
    }
    octopus.init();
}(document));
/* STUDENT APPLICATION */
/*
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
*/
/*
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


*/

