//
//  SocialLogin.m
//  BaseApp
//
//  Created by James Jung on 2016. 3. 23..
//  Copyright © 2016년 Facebook. All rights reserved.
//
#import "SocialLogin.h"
#import "FBSDKCoreKit/FBSDKCoreKit.h"
#import "FBSDKLoginKit/FBSDKLoginKit.h"


@implementation SocialLogin

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loginWithFacebook:(RCTResponseSenderBlock)callback) {
  
  FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
  UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  
  NSLog(@"000000");
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    NSLog(@"111111");
    
    if ([FBSDKAccessToken currentAccessToken])
    {
      NSLog(@"222222");
      
      [self getFBUserInfo:callback ];
      
    } else {
    
      NSLog(@"333333");
  
      [login
        logInWithReadPermissions: @[@"email", @"public_profile"] fromViewController:ctrl handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
        
          NSLog(@"444444");
          
          if (error) {
            NSLog(@"error");
            callback(@[@"Error", [NSNull null]]);
          } else if (result.isCancelled) {
            NSLog(@"Canceled");
            callback(@[@"Canceled", [NSNull null]]);
          } else {
            NSLog(@"success");
            FBSDKAccessToken *token = result.token;
            if (token){
              [self getFBUserInfo:callback ];
            }
          }
       }];
    }
  });
};

-(void)getFBUserInfo:(RCTResponseSenderBlock)callback {
  [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me" parameters:@{@"fields": @"email, name, last_name, first_name"}]
    startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id user, NSError *error){
      if (!error) {
        NSDictionary *dictUser = (NSDictionary *)user;
        NSString *name   = [dictUser objectForKey:@"name"];
        NSString *email     = [dictUser objectForKey:@"email"];
        NSString *fist_name  = [dictUser objectForKey:@"first_name"];
        NSString *uid =[dictUser objectForKey:@"id"];

        NSLog(@"%@", user);
        NSLog(@"%@", name);
        NSLog(@"%@", email);
        NSLog(@"%@", fist_name);

        NSString *image = @"https://graph.facebook.com/%@/picture?type=small";
        [image stringByAppendingFormat:image,[ dictUser objectForKey:@"id"] ];
        NSLog(@"%@", image);

        NSDictionary *credentials = @{ @"id": uid, @"email": email, @"image": image, @"name": name };
        callback(@[[NSNull null], credentials]);
      } else {
        callback(@[@"Canceled", [NSNull null]]);
      }
    }
  ];
}

@end