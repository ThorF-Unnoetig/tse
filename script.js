document.getElementById('hochBtn').addEventListener('click', function() {
    alert('Hoch gedrückt!');
});

document.getElementById('runterBtn').addEventListener('click', function() {
    alert('Runter gedrückt!');
});

document.getElementById('speichernBtn').addEventListener('click', function() {
    alert('Speichern gedrückt!');
});

document.getElementById('setTimeSpanBtn').addEventListener('click', function() {
    const timeName = document.getElementById('timeName').value.trim();
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const statusElement = document.getElementById('timeSpanStatus');
    
    // Überprüfen, ob der Name und beide Zeiten ausgewählt wurden
    if (timeName && startTime && endTime) {
        // Überprüfen, ob die Startzeit vor der Endzeit liegt
        if (startTime < endTime) {
            // Prüfen, ob die Zeitspanne sich mit einer bestehenden überschneidet
            if (isTimeSpanOverlapping(startTime, endTime)) {
                statusElement.textContent = 'Die neue Zeitspanne überschneidet sich mit einer bestehenden Zeitspanne!';
            } else {
                // Eine neue Zeitspanne speichern
                addTimeSpanToTable(timeName, startTime, endTime);
                statusElement.textContent = `Die Zeitspanne "${timeName}" wurde gesetzt: ${startTime} bis ${endTime}.`;
            }
        } else {
            statusElement.textContent = 'Die Startzeit muss vor der Endzeit liegen!';
        }
    } else if (!timeName) {
        statusElement.textContent = 'Bitte einen Namen für die Zeitspanne eingeben!';
    } else {
        statusElement.textContent = 'Bitte sowohl eine Start- als auch eine Endzeit auswählen!';
    }
});

function addTimeSpanToTable(timeName, startTime, endTime) {
    const tableBody = document.getElementById('timeSpanTable').getElementsByTagName('tbody')[0];

    // Erstelle eine neue Zeile
    const row = tableBody.insertRow();

    // Erstelle die Zellen für Name, Startzeit, Endzeit und Löschen
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    // Füge den Namen, die Start- und Endzeit in die Zellen ein
    cell1.textContent = timeName;
    cell2.textContent = startTime;
    cell3.textContent = endTime;

    // Erstelle den Löschen-Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Löschen';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
        deleteTimeSpan(row, timeName, startTime, endTime);
    };

    // Füge den Löschen-Button in die letzte Zelle ein
    cell4.appendChild(deleteBtn);
}

// Funktion, um zu prüfen, ob sich die neue Zeitspanne mit einer bestehenden überschneidet
function isTimeSpanOverlapping(newStartTime, newEndTime) {
    const rows = document.getElementById('timeSpanTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const existingStartTime = rows[i].cells[1].textContent;
        const existingEndTime = rows[i].cells[2].textContent;

        // Wenn die neue Zeitspanne die bestehende Zeitspanne überschneidet
        if ((newStartTime < existingEndTime && newEndTime > existingStartTime)) {
            return true;
        }
    }
    
    return false;
}

function deleteTimeSpan(row, timeName, startTime, endTime) {
    // Lösche die Zeile aus der Tabelle
    row.remove();

    // Erfolgsnachricht
    const statusElement = document.getElementById('timeSpanStatus');
    statusElement.textContent = `Die Zeitspanne "${timeName}" (${startTime} bis ${endTime}) wurde gelöscht.`;
}
