export class SortStateHelper {
    fromString(value) {
        const newValue = value ? value.split(',') : [];
        this.active = newValue[0];
        this.direction = newValue[1] === 'asc' ? 'asc' : 'desc';
    }
    toString() {
        if (!this.active || !this.direction) {
            return '';
        }
        return `${this.active},${this.direction}`;
    }
    update(active) {
        if (active === this.active) {
            this.nextDirection();
        }
        else {
            this.active = active;
            this.direction = 'asc';
        }
    }
    nextDirection() {
        // if (this.direction === 'asc') {
        // 	this.direction = 'desc';
        // } else if (this.direction === 'desc') {
        // 	this.direction = null;
        // 	this.active = null;
        // } else {
        // 	this.direction = 'asc';
        // }
        if (this.direction === 'asc') {
            this.direction = 'desc';
        }
        else {
            this.direction = 'asc';
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1zdGF0ZS5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLXRhYmxlL3NyYy9saWIvc29ydC1zdGF0ZS5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLGVBQWU7SUFJcEIsVUFBVSxDQUFDLEtBQWE7UUFDOUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN6RCxDQUFDO0lBRU0sUUFBUTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxPQUFPLEVBQUUsQ0FBQztTQUNWO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQzFDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBYztRQUMzQixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDRixDQUFDO0lBRU0sYUFBYTtRQUNuQixrQ0FBa0M7UUFDbEMsNEJBQTRCO1FBQzVCLDBDQUEwQztRQUMxQywwQkFBMEI7UUFDMUIsdUJBQXVCO1FBQ3ZCLFdBQVc7UUFDWCwyQkFBMkI7UUFDM0IsSUFBSTtRQUVKLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDeEI7YUFBTTtZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0YsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNvcnRTdGF0ZUhlbHBlciB7XHJcblx0cHVibGljIGFjdGl2ZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZztcclxuXHJcblx0cHVibGljIGZyb21TdHJpbmcodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgbmV3VmFsdWUgPSB2YWx1ZSA/IHZhbHVlLnNwbGl0KCcsJykgOiBbXTtcclxuXHJcblx0XHR0aGlzLmFjdGl2ZSA9IG5ld1ZhbHVlWzBdO1xyXG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBuZXdWYWx1ZVsxXSA9PT0gJ2FzYycgPyAnYXNjJyA6ICdkZXNjJztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcgfCBudWxsIHtcclxuXHRcdGlmICghdGhpcy5hY3RpdmUgfHwgIXRoaXMuZGlyZWN0aW9uKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHRcdHJldHVybiBgJHt0aGlzLmFjdGl2ZX0sJHt0aGlzLmRpcmVjdGlvbn1gXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKGFjdGl2ZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAoYWN0aXZlID09PSB0aGlzLmFjdGl2ZSkge1xyXG5cdFx0XHR0aGlzLm5leHREaXJlY3Rpb24oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cdFx0XHR0aGlzLmRpcmVjdGlvbiA9ICdhc2MnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIG5leHREaXJlY3Rpb24oKTogdm9pZCB7XHJcblx0XHQvLyBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdhc2MnKSB7XHJcblx0XHQvLyBcdHRoaXMuZGlyZWN0aW9uID0gJ2Rlc2MnO1xyXG5cdFx0Ly8gfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSB7XHJcblx0XHQvLyBcdHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcclxuXHRcdC8vIFx0dGhpcy5hY3RpdmUgPSBudWxsO1xyXG5cdFx0Ly8gfSBlbHNlIHtcclxuXHRcdC8vIFx0dGhpcy5kaXJlY3Rpb24gPSAnYXNjJztcclxuXHRcdC8vIH1cclxuXHJcblx0XHRpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdhc2MnKSB7XHJcblx0XHRcdHRoaXMuZGlyZWN0aW9uID0gJ2Rlc2MnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5kaXJlY3Rpb24gPSAnYXNjJztcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=