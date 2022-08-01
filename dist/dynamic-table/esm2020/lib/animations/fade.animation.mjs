import { animate, keyframes, style, transition, trigger } from '@angular/animations';
export function paginationFadeInAnimation(timings = '0.12s ease-in-out') {
    return trigger('paginationFadeIn', [
        transition(`void => *`, [
            animate(timings, keyframes([
                style({ width: 0, offset: 0 }),
                style({ width: 32, offset: 1 })
            ])),
        ]),
    ]);
}
export function paginationFadeOutAnimation(timings = '0.12s ease-in-out') {
    return trigger('paginationFadeOut', [
        transition('* => void', [
            animate(timings, keyframes([
                style({ width: 32, offset: 0 }),
                style({ width: 0, offset: 1 })
            ])),
        ]),
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkZS5hbmltYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLXRhYmxlL3NyYy9saWIvYW5pbWF0aW9ucy9mYWRlLmFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJGLE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxVQUEyQixtQkFBbUI7SUFDcEYsT0FBTyxPQUFPLENBQUMsa0JBQWtCLEVBQUU7UUFDL0IsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOLENBQUM7S0FDTCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFVBQTJCLG1CQUFtQjtJQUNyRixPQUFPLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtRQUNoQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2dCQUN2QixLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ04sQ0FBQztLQUNMLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBrZXlmcmFtZXMsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFnaW5hdGlvbkZhZGVJbkFuaW1hdGlvbih0aW1pbmdzOiBzdHJpbmcgfCBudW1iZXIgPSAnMC4xMnMgZWFzZS1pbi1vdXQnKSB7XHJcbiAgICByZXR1cm4gdHJpZ2dlcigncGFnaW5hdGlvbkZhZGVJbicsIFtcclxuICAgICAgICB0cmFuc2l0aW9uKGB2b2lkID0+ICpgLCBbXHJcbiAgICAgICAgICAgIGFuaW1hdGUodGltaW5ncywga2V5ZnJhbWVzKFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHsgd2lkdGg6IDAsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgICAgICAgIHN0eWxlKHsgd2lkdGg6IDMyLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICAgICAgXSkpLFxyXG4gICAgICAgIF0pLFxyXG4gICAgXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWdpbmF0aW9uRmFkZU91dEFuaW1hdGlvbih0aW1pbmdzOiBzdHJpbmcgfCBudW1iZXIgPSAnMC4xMnMgZWFzZS1pbi1vdXQnKSB7XHJcbiAgICByZXR1cm4gdHJpZ2dlcigncGFnaW5hdGlvbkZhZGVPdXQnLCBbXHJcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xyXG4gICAgICAgICAgICBhbmltYXRlKHRpbWluZ3MsIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHdpZHRoOiAzMiwgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUoeyB3aWR0aDogMCwgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgICAgIF0pKSxcclxuICAgICAgICBdKSxcclxuICAgIF0pO1xyXG59XHJcbiJdfQ==