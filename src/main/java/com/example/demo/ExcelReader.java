package com.example.demo;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class ExcelReader {
    public final String FILE_PATH = "C:\\Academy\\TuneBash\\Musikquiz-frågor.xlsx";

    public List<Questions> questAdder() throws IOException, InvalidFormatException {
        File file = new File(FILE_PATH);
        FileInputStream inputStream = new FileInputStream(file);

        Workbook workbook = WorkbookFactory.create(inputStream);
        inputStream.close();

        System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");

        System.out.println("Retrieving Sheets using Java 8 forEach with lambda");
        workbook.forEach(sheet -> {
            System.out.println("=> " + sheet.getSheetName());
        });

        Sheet sheet = workbook.getSheetAt(0);
        DataFormatter dataFormatter = new DataFormatter();
        List<Questions> listQuestions = new ArrayList<>();

        for (Row row: sheet) {
            int i = 0;
            String[] quest = new String[9];
            for(Cell cell: row) {
                String cellValue = dataFormatter.formatCellValue(cell);
                quest[i] = cellValue;
                i++;
                if(i == 9)
                    break;
            }
            listQuestions.add(new Questions(quest[0],quest[1],quest[2],quest[3],quest[4],quest[5],quest[6],quest[7], quest[8]));
        }

        workbook.close();
        return listQuestions;
    }
}