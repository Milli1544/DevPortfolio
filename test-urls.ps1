# Test API endpoints
$urls = @(
    "https://dev-portfolio-ajsa.vercel.app",
    "https://potential-carnival.vercel.app"
)

Write-Host "Testing deployment URLs..." -ForegroundColor Cyan
Write-Host ""

foreach ($baseURL in $urls) {
    Write-Host "Testing: $baseURL" -ForegroundColor Yellow
    
    try {
        # Test health endpoint
        $healthResponse = Invoke-WebRequest -Uri "$baseURL/api/health" -Method GET -TimeoutSec 10
        Write-Host "Health endpoint working: $($healthResponse.StatusCode)" -ForegroundColor Green
        
        # Test projects endpoint
        $projectsResponse = Invoke-WebRequest -Uri "$baseURL/api/projects" -Method GET -TimeoutSec 10
        Write-Host "Projects endpoint working: $($projectsResponse.StatusCode)" -ForegroundColor Green
        
        # Test qualifications endpoint
        $qualificationsResponse = Invoke-WebRequest -Uri "$baseURL/api/qualifications" -Method GET -TimeoutSec 10
        Write-Host "Qualifications endpoint working: $($qualificationsResponse.StatusCode)" -ForegroundColor Green
        
        Write-Host "$baseURL is working correctly!" -ForegroundColor Green
        Write-Host ""
        
        # If this URL works, suggest updating the client config
        if ($baseURL -eq "https://potential-carnival.vercel.app") {
            Write-Host "Your API is deployed at potential-carnival.vercel.app" -ForegroundColor Yellow
            Write-Host "You need to update your client/src/config/api.js to use this URL" -ForegroundColor Yellow
        }
        
        break
        
    } catch {
        Write-Host "$baseURL failed: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "Test completed!" -ForegroundColor Cyan
