//
//  ShareViewController.h
//  BaseShare
//
//  Created by James Jung on 2016. 3. 11..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Social/Social.h>

@interface ShareViewController : SLComposeServiceViewController
{
  NSExtensionItem *inputItem;
  NSURL *destinationURL;
  NSUserDefaults *sharedUserDefaults;
}
@end
