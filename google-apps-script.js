/**
 * Google Apps Script for Hospitality Manager
 * 
 * This script provides API endpoints for the Hospitality Manager application
 * to interact with Google Sheets as a database.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Save and deploy as Web App
 * 5. Set permissions to "Anyone" for access
 */

const SHEET_NAME = 'Bookings';

/**
 * Handle GET requests - Fetch all bookings
 * @param {Object} e - Event object
 * @returns {ContentService.TextOutput} JSON response
 */
function doGet(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            return createErrorResponse('Sheet not found: ' + SHEET_NAME);
        }

        const data = sheet.getDataRange().getValues();

        if (data.length === 0) {
            return createSuccessResponse([]);
        }

        const headers = data[0];
        const rows = data.slice(1);

        // Convert rows to objects
        const result = rows.map((row, index) => {
            let obj = { id: index + 1 };
            headers.forEach((header, colIndex) => {
                obj[header] = row[colIndex];
            });
            return obj;
        });

        return createSuccessResponse(result);

    } catch (error) {
        return createErrorResponse(error.toString());
    }
}

/**
 * Handle POST requests - Create new booking
 * @param {Object} e - Event object with postData
 * @returns {ContentService.TextOutput} JSON response
 */
function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            return createErrorResponse('Sheet not found: ' + SHEET_NAME);
        }

        // Parse incoming data
        const data = JSON.parse(e.postData.contents);

        // Validate required fields
        const requiredFields = ['guestName', 'email', 'phone', 'checkInDate', 'checkOutDate', 'roomType', 'numberOfGuests'];
        for (let field of requiredFields) {
            if (!data[field]) {
                return createErrorResponse(`Missing required field: ${field}`);
            }
        }

        // Append new row
        sheet.appendRow([
            data.guestName,
            data.email,
            data.phone,
            data.checkInDate,
            data.checkOutDate,
            data.roomType,
            data.numberOfGuests,
            data.specialRequests || '',
            'Confirmed',
            new Date().toISOString()
        ]);

        return createSuccessResponse({
            success: true,
            message: 'Booking created successfully',
            data: data
        });

    } catch (error) {
        return createErrorResponse(error.toString());
    }
}

/**
 * Handle PUT requests - Update existing booking
 * @param {Object} e - Event object
 * @returns {ContentService.TextOutput} JSON response
 */
function doPut(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            return createErrorResponse('Sheet not found: ' + SHEET_NAME);
        }

        const data = JSON.parse(e.postData.contents);
        const rowId = data.id;

        if (!rowId) {
            return createErrorResponse('Missing booking ID');
        }

        // Update row (rowId + 1 because of header row)
        const row = parseInt(rowId) + 1;

        sheet.getRange(row, 1).setValue(data.guestName);
        sheet.getRange(row, 2).setValue(data.email);
        sheet.getRange(row, 3).setValue(data.phone);
        sheet.getRange(row, 4).setValue(data.checkInDate);
        sheet.getRange(row, 5).setValue(data.checkOutDate);
        sheet.getRange(row, 6).setValue(data.roomType);
        sheet.getRange(row, 7).setValue(data.numberOfGuests);
        sheet.getRange(row, 8).setValue(data.specialRequests || '');
        sheet.getRange(row, 9).setValue(data.status || 'Confirmed');

        return createSuccessResponse({
            success: true,
            message: 'Booking updated successfully'
        });

    } catch (error) {
        return createErrorResponse(error.toString());
    }
}

/**
 * Handle DELETE requests - Delete booking
 * @param {Object} e - Event object
 * @returns {ContentService.TextOutput} JSON response
 */
function doDelete(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            return createErrorResponse('Sheet not found: ' + SHEET_NAME);
        }

        const params = JSON.parse(e.postData.contents);
        const rowId = params.id;

        if (!rowId) {
            return createErrorResponse('Missing booking ID');
        }

        // Delete row (rowId + 1 because of header row)
        const row = parseInt(rowId) + 1;
        sheet.deleteRow(row);

        return createSuccessResponse({
            success: true,
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        return createErrorResponse(error.toString());
    }
}

/**
 * Create success response
 * @param {*} data - Response data
 * @returns {ContentService.TextOutput} JSON response
 */
function createSuccessResponse(data) {
    return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: data }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 * @param {string} error - Error message
 * @returns {ContentService.TextOutput} JSON response
 */
function createErrorResponse(error) {
    return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: error }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Initialize the sheet with headers if it doesn't exist
 */
function initializeSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);

        // Add headers
        const headers = [
            'Guest Name',
            'Email',
            'Phone',
            'Check-in Date',
            'Check-out Date',
            'Room Type',
            'Number of Guests',
            'Special Requests',
            'Status',
            'Created At'
        ];

        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

        // Format header row
        sheet.getRange(1, 1, 1, headers.length)
            .setBackground('#FFB088')
            .setFontColor('#FFFFFF')
            .setFontWeight('bold');

        // Freeze header row
        sheet.setFrozenRows(1);

        Logger.log('Sheet initialized successfully');
    } else {
        Logger.log('Sheet already exists');
    }
}

/**
 * Add sample data for testing
 */
function addSampleData() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
        initializeSheet();
    }

    const sampleData = [
        ['Milan Thongbam', 'milan.thongbam@example.com', '+1 (555) 123-4567', '2026-01-10', '2026-01-15', 'Deluxe', '2', 'Late check-in requested', 'Checked In', new Date()],
        ['Sarah Johnson', 'sarah.j@example.com', '+1 (555) 234-5678', '2026-01-12', '2026-01-16', 'Suite', '1', '', 'Checked In', new Date()],
        ['Michael Brown', 'mbrown@example.com', '+1 (555) 345-6789', '2026-01-13', '2026-01-18', 'Standard', '3', 'Extra bed needed', 'Confirmed', new Date()],
        ['Emily Davis', 'emily.davis@example.com', '+1 (555) 456-7890', '2026-01-08', '2026-01-12', 'Standard', '2', '', 'Checked Out', new Date()],
        ['David Wilson', 'dwilson@example.com', '+1 (555) 567-8901', '2026-01-14', '2026-01-20', 'Presidential', '4', 'Anniversary celebration', 'Pending', new Date()]
    ];

    sampleData.forEach(row => {
        sheet.appendRow(row);
    });

    Logger.log('Sample data added successfully');
}
