package com.luxtravel.models;

public class Favorite extends BaseModel {
    private Long userId;
    private Long packageId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }
}
