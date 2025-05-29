package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.RequestDTO;
import com.company.finance.finance_manager.dto.RequestPagedDataDTO;
import com.company.finance.finance_manager.dto.RequestPaginatedDTO;
import com.company.finance.finance_manager.dto.RequestUpdateDTO;
import com.company.finance.finance_manager.entity.Request;
import com.company.finance.finance_manager.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping
    public ResponseEntity<List<RequestPaginatedDTO>> getAllRequests() {
        List<RequestPaginatedDTO> requestList = requestService.getAllRequests();

        return ResponseEntity.ok(requestList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Integer id) {
        RequestPagedDataDTO requestPagedDataDTO = requestService.getRequestById(id);

        return ResponseEntity.ok(requestPagedDataDTO);
    }

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody RequestDTO requestDTO) {
        Request request = requestService.createRequest(requestDTO);
        URI location = URI.create("/requests/" + request.getId()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Integer id, @RequestBody RequestUpdateDTO updateDto) {
        Request response = requestService.updateRequest(id, updateDto);
        return ResponseEntity.ok(response);
    }
}
