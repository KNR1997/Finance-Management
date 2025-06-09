package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.dto.InvoiceListDTO;
import com.company.finance.finance_manager.dto.PaginatedResponse;
import com.company.finance.finance_manager.dto.UpdateInvoiceDTO;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.service.InvoiceService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<InvoiceListDTO>> getAllInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String fgsStatus,
            @RequestParam(required = false) String financeStatus,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<InvoiceListDTO> invoicePage = invoiceService.getInvoicesPaginated(pageable,
                search,
                location,
                fgsStatus,
                financeStatus,
                start_date,
                end_date);

        PaginatedResponse<InvoiceListDTO> response = new PaginatedResponse<>(invoicePage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Integer id) {
        Invoice invoice = invoiceService.getInvoiceById(id);

        return ResponseEntity.ok(invoice);
    }

    @PostMapping
    public ResponseEntity<Invoice> createCourse(@RequestBody InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceService.createInvoice(invoiceDTO);
        URI location = URI.create("/courses/" + invoice.getInvoiceNumber()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(invoice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateCourse(@PathVariable Integer id, @RequestBody UpdateInvoiceDTO updateDto) {
        Invoice response = invoiceService.updateInvoice(id, updateDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/export")
    public void exportRequestsToExcel(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String fgsStatus,
            @RequestParam(required = false) String financeStatus,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date,
            HttpServletResponse response
    ) throws IOException {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        Page<InvoiceListDTO> invoicePage = invoiceService.getInvoicesPaginated(pageable,
                search,
                location,
                fgsStatus,
                financeStatus,
                start_date,
                end_date);

        // Create Excel workbook
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Invoices");

        // Header row
        HSSFRow headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Company Name");
        headerRow.createCell(2).setCellValue("Invoice No.");
        headerRow.createCell(3).setCellValue("Value");
        headerRow.createCell(4).setCellValue("Territory");
        headerRow.createCell(5).setCellValue("CreatedAt");
        headerRow.createCell(6).setCellValue("FGS(Status)");
        headerRow.createCell(7).setCellValue("Finance(Status)");
        // Add more fields based on your DTO

        // Data rows
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        int rowNum = 1;
        for (InvoiceListDTO invoiceListDTO : invoicePage.getContent()) {
            HSSFRow row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(invoiceListDTO.getId());
            row.createCell(1).setCellValue(invoiceListDTO.getCompanyName()); // Replace with your actual fields
            row.createCell(2).setCellValue(invoiceListDTO.getInvoiceNumber());
            row.createCell(3).setCellValue(invoiceListDTO.getValue());
            row.createCell(4).setCellValue(invoiceListDTO.getTerritory());
            row.createCell(5).setCellValue(invoiceListDTO.getCreatedAt().format(formatter));
            row.createCell(6).setCellValue(invoiceListDTO.getFgsStatus().toString());
            row.createCell(7).setCellValue(invoiceListDTO.getFinanceStatus().toString());
        }

        // Set response headers
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=invoices.xls");

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @GetMapping("/locations")
    public ResponseEntity<Page<String>> getInvoiceLocations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<String> locations = invoiceService.getInvoiceLocations(pageable, search);

        return ResponseEntity.ok(locations);
    }

}
